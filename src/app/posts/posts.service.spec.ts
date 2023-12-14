import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import PostEntity from './entities/post.entity';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let postService: PostsService;
  let postRepository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {},
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
});
