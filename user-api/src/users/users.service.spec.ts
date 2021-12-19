import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './../users/users.repository';
import { UsersService } from './users.service';
import { CreateSimpleUserDto } from './dto/create-simple-user.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { UsersModule } from './users.module';
import { CACHE_MANAGER } from '@nestjs/common';
import { AppModule } from 'src/app.module';


const mockUserServices = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findCpf: jest.fn(),
  findAddress: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  createAdminUser: jest.fn()
});

describe('UsersService', () => {
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AppModule],
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: mockUserServices,
        },

      ],
    }).compile();

    service = await module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    let mockAdminDto: CreateSimpleUserDto;

    beforeEach(() => {
      mockAdminDto = {
        name: 'Mock User',
        cpf: '12341231212',
        password: 'mockPassword',
        passwordConfirmation: 'mockPassword',
      };
    });

    it('should create an user if passwords match', async () => {
      const result = await service.createAdminUser(mockAdminDto);

      expect(result).toEqual('mockUser');
    });

    it('should throw an error if passwords doesnt match', async () => {
      mockAdminDto.passwordConfirmation = 'wrongPassword';
      expect(service.createAdminUser(mockAdminDto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});