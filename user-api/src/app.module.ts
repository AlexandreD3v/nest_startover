import { Module, CacheModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(), HttpModule, CacheModule.register()],
  controllers: [],
  providers: [],
})
export class AppModule {}
