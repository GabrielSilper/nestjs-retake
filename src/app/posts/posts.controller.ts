import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import ResponsePostDto from './dto/response-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<ResponsePostDto[]> {
    const post = await this.postsService.getAllPosts();
    return post.map(
      (post) =>
        new ResponsePostDto(
          post.id,
          post.title,
          post.content,
          post.createdAt,
          post.updatedAt,
        ),
    );
  }

  @Get(':id')
  async getPostById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponsePostDto> {
    const post = await this.postsService.getPostById(id);
    return new ResponsePostDto(
      post.id,
      post.title,
      post.content,
      post.createdAt,
      post.updatedAt,
    );
  }
}
