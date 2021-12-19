import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, CacheInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSimpleUserDto } from './dto/create-simple-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminDto } from './dto/create-admin.dto';

@Controller('users-api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/admin')
  async createAdminUser(
    @Body() createUserDto: CreateSimpleUserDto,
  ): Promise<AdminDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Post('/create')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/list')
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/findAddress/:cep')
  findAddress(@Param('cep') cep: string) {
    return this.usersService.findAddress(cep);
  }

  @Get('/list/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('/listCPF/:cpf')
  findCpf(@Param('cpf') cpf: string) {
    return this.usersService.findCpf(cpf);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
