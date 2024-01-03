import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { Repository } from 'typeorm';
import { userMock } from './mocks/index.mock';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('createUser Method', () => {
    it('should create a new user with sucess', async () => {
      //Arrange
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userMock);

      //Act
      const result = await userService.createUser(userMock);

      //Assert
      expect(result).toBeDefined();
      expect(result).toEqual(userMock);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllUsers Method', () => {
    it('should create a new user with sucess', async () => {
      //Arrange
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([userMock]);

      //Act
      const result = await userService.getAllUsers();

      //Assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
