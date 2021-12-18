import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers'
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';


@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserRepository]), HttpModule, CacheModule.register()]
})
export class UsersModule {}
