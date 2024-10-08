import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  address: string;

  @Column('double', { nullable: true })
  latitude: number;

  @Column('double', { nullable: true })
  longitude: number;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
