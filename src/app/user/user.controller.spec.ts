import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import UserCreationDto from './dto/create-user.dto';
import { userMock } from './mocks/users.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            save: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('function createUser', () => {
    it('should return a new user', async () => {
      //Arrange
      const newUser = new UserCreationDto(
        'Gabriel',
        'gabriel@mock.com',
        '123456',
      );

      jest.spyOn(userService, 'save').mockResolvedValueOnce({
        ...newUser,
        id: 1,
        posts: [],
      });

      // Act
      const response = await userController.createUser(newUser);

      // Assert
      expect(response).not.toBeNull();
      expect(userService.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('function findById', () => {
    it('should return a user', async () => {
      //Arrange
      const user = userMock;

      jest.spyOn(userService, 'findById').mockResolvedValueOnce(user);

      // Act
      const response = await userController.findById(user.id);

      // Assert
      expect(response).not.toBeNull();
      expect(response).toEqual(user);
      expect(userService.findById).toHaveBeenCalledTimes(1);
    });
  });
});
