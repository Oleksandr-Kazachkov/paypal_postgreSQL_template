import { Product } from 'src/postgres/products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from 'src/postgres/user/entity/user.entity';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: number;

  @Column({ type: 'text', nullable: false })
  product_paypal_id: string;
}
