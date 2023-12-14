import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import UserCreationDto from './dto/UserCreationDto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('function save', () => {
    it('should save a new user with success', async () => {
      //Arrange
      const newUser = new UserCreationDto(
        'Gabriel',
        'gabriel@mock.com',
        '123456',
      );

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce({
        ...newUser,
        id: 1,
        posts: [],
      });

      //Act
      const result = userService.save(newUser);

      //Assert
      expect(result).toBeDefined();
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
