import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { PostsService } from './app/posts/posts.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [PostsService],
})
export class AppModule {}
