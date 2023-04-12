import { CommentsEntity } from 'src/components/comments/entity/comments.entity';
import { LikesEntity } from 'src/components/likes/entity/likes.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ default: null, type: 'varchar' })
  user_paypal_id: string;

  @Column({ length: 500, type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => LikesEntity, (likes) => likes.user)
  likes: string;

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: string;
}
