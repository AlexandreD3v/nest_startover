import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateSimpleUserDto } from './dto/create-simple-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createSimpleUserDto: CreateSimpleUserDto,
  ): Promise<User> {
    const { name, cpf, password} = createSimpleUserDto;

    const user = this.create();
    user.name = name;
    user.cpf = cpf;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    
    user.password = await this.hashPassword(password, user.salt);
    try {
      await this.save(user);
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
    
        throw new InternalServerErrorException(
          'Erro' + error,
        );
      
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}