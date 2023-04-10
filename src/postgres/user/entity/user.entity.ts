import { Likes } from 'src/postgres/products/entity/likes.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
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

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: string;
}
