import { Injectable, Inject, UnprocessableEntityException, CACHE_MANAGER, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSimpleUserDto } from './dto/create-simple-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { Cache } from 'cache-manager';
import { Any } from 'typeorm';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}


  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(createUserDto);
    return { obj: user, user: 'This action adds a new user'};
  }

  async findAll() {
    const res = await this.userRepository.find()
    return { obj: res, msg: 'This action returns all users'};
  }

  async findOne(id: number) {
    const res = await this.userRepository.findOne({ where: { id: id } });
    return { obj: res, msg: 'This action returns a #${id} user'};
  }

  async findCpf(cpf: string) {
    const res = await this.userRepository.findOne({ where: { cpf: cpf } });
    return { obj: res, msg: 'This action returns a #${id} user by CPF'};
  }

  async findAddress(cep: string): Promise<Observable<AxiosResponse<[]>>> {

    let cachedvalue = Any;
    try{
      cachedvalue = JSON.parse(await this.cacheManager.get(cep));
    

    if(!cachedvalue){
      let address = this.httpService.get(`https://viacep.com.br/ws/${cep}/json`, {
        headers: {
          'Accept': 'application/json'
        }
      }).pipe(
        map(response => response.data),
        );
        await this.cacheManager.set(cep, JSON.stringify(address), { ttl: 1000 });
        return address;
     }
     else{
     // return cachedvalue;
    }  
  } catch(err){

  }    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update({ id }, updateUserDto);
    return { obj: user, user: '`This action updates a #${id} user'};
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
    return `This action removes a #${id} user`;
  }

  async createAdminUser(createUserDto: CreateSimpleUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto);
    }
  }
}
