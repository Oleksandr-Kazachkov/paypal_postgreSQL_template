import { Product } from 'src/postgres/products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from 'src/postgres/user/entity/user.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'text', default: null })
  comment_data: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: number;

  @Column({ type: 'text', nullable: false })
  product_paypal_id: string;
}
