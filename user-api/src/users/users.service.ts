import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSimpleUserDto } from './dto/create-simple-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateSimpleUserDto) {
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
