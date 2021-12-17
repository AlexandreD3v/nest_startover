import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
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

  findOne(id: number) {
    
    return { obj: this.userRepository.findByIds([id]), msg: 'This action returns a #${id} user'};
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
