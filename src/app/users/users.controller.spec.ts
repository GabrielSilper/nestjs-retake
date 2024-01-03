import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userMock } from './mocks/index.mock';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('createUser controller method', () => {
    it('should create a user', async () => {
      //Arrange
      jest.spyOn(usersService, 'createUser').mockResolvedValueOnce(userMock);

      //Act
      const result = await usersController.createUser(userMock);

      //Assert
      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password');
      expect(result.id).toEqual(userMock.id);
      expect(result.name).toEqual(userMock.name);
      expect(result.username).toEqual(userMock.username);
      expect(result.email).toEqual(userMock.email);
      expect(usersService.createUser).toHaveBeenCalledWith(userMock);
    });
  });

  describe('getAllUsers controller method', () => {
    it('should return a list of users', async () => {
      //Arrange
      jest.spyOn(usersService, 'getAllUsers').mockResolvedValueOnce([userMock]);

      //Act
      const result = await usersController.getAllUsers();

      //Assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0]).not.toHaveProperty('password');
      expect(result[0].id).toEqual(userMock.id);
      expect(result[0].name).toEqual(userMock.name);
      expect(result[0].username).toEqual(userMock.username);
      expect(result[0].email).toEqual(userMock.email);
      expect(usersService.getAllUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById controller method', () => {
    it('should return a user', async () => {
      //Arrange
      jest.spyOn(usersService, 'getUserById').mockResolvedValueOnce(userMock);

      //Act
      const result = await usersController.getUserById(userMock.id);

      //Assert
      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password');
      expect(result.id).toEqual(userMock.id);
      expect(result.name).toEqual(userMock.name);
      expect(result.username).toEqual(userMock.username);
      expect(result.email).toEqual(userMock.email);
      expect(usersService.getUserById).toHaveBeenCalledWith(userMock.id);
    });
  });

  describe('updateUser controller method', () => {
    it('should update a user', async () => {
      //Arrange
      jest.spyOn(usersService, 'updateUser').mockResolvedValueOnce(userMock);

      //Act
      const result = await usersController.updateUser(userMock.id, userMock);

      //Assert
      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password');
      expect(result.id).toEqual(userMock.id);
      expect(result.name).toEqual(userMock.name);
      expect(result.username).toEqual(userMock.username);
      expect(result.email).toEqual(userMock.email);
      expect(usersService.updateUser).toHaveBeenCalledWith(
        userMock.id,
        userMock,
      );
    });
  });

  describe('deleteUser controller method', () => {
    it('should delete a user', async () => {
      //Arrange
      jest.spyOn(usersService, 'deleteUser').mockResolvedValueOnce();

      //Act
      const result = await usersController.deleteUser(userMock.id);

      //Assert
      expect(result).toBeUndefined();
      expect(usersService.deleteUser).toHaveBeenCalledWith(userMock.id);
    });
  });
});
