import { userMock } from '../../user/mocks/users.mock';
import CreatePostDto from '../dto/create-post.dto';
import PostEntity from '../entities/post.entity';

export const postDtoMock: CreatePostDto = {
  title: 'title 1',
  content: 'content 1',
};

export const postEntityMock: PostEntity = {
  id: 1,
  title: 'title 1',
  content: 'content 1',
  user: userMock,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};
