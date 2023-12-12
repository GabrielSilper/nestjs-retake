import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
