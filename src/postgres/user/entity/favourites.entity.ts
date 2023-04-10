import { Product } from 'src/postgres/products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Favourites {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: number;

  @Column({ type: 'text', nullable: false })
  product_paypal_id: string;
}
