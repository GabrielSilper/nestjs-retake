import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PostEntity from '../posts/entities/post.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  posts: PostEntity[];
}
