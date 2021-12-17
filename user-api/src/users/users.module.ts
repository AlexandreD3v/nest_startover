import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers'


@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  imports: [DatabaseModule]
})
export class UsersModule {}
