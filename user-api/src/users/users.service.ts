import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update({ id }, updateUserDto);
    return { obj: user, user: '`This action updates a #${id} user'};
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
    return `This action removes a #${id} user`;
  }
}
