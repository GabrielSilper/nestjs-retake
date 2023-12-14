import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import PostEntity from './entities/post.entity';
import { Repository } from 'typeorm';
import { postDtoMock, postEntityMock } from './mocks/posts.mock';

describe('PostsService', () => {
  let postService: PostsService;
  let postRepository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    postService = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<PostEntity>>(
      getRepositoryToken(PostEntity),
    );
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
    expect(postRepository).toBeDefined();
  });

  describe('function createPost', () => {
    it('should create a post with sucess', async () => {
      //Arrange
      const postDto = postDtoMock;
      const postEntity = postEntityMock;

      jest.spyOn(postRepository, 'save').mockResolvedValueOnce(postEntity);

      //Act
      const result = await postService.createPost(1, postDto);

      //Assert
      expect(result).toBeDefined();
      expect(result).toEqual(postEntity);
      expect(postRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
