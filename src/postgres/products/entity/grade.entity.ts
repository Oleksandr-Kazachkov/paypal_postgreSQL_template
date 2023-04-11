import { Product } from 'src/postgres/products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  OneToOne,
} from 'typeorm';
import { User } from 'src/postgres/user/entity/user.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: number;

  @Column({ type: 'text', nullable: false })
  product_paypal_id: string;

  @Column({ type: 'int', nullable: false })
  grade: number;
}
