import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers'
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserRepository])]
})
export class UsersModule {}
