import { HttpService } from '@nestjs/axios';
import { CacheModule, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { json } from 'stream/consumers';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let app: INestApplication;
  let userController: UsersController;

  beforeEach(async () => {
    jest.useFakeTimers();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [] 
    }).overrideProvider(UsersService)
      .useValue({
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findCpf: jest.fn(),
        findAddress: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        createAdminUser: jest.fn(),
      }).compile();

    app = module.createNestApplication();
    await app.init();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
