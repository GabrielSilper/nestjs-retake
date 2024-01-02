import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userMock } from './mocks';

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

  describe('createUser', () => {
    it('should create a user', async () => {
      //Arrange
      jest.spyOn(usersService, 'createUser').mockResolvedValueOnce(userMock);

      //Act
      const user = await usersController.createUser(userMock);

      //Assert
      expect(user).toBeDefined();
      expect(user).toEqual(userMock);
      expect(usersService.createUser).toHaveBeenCalledWith(userMock);
    });
  });
});
