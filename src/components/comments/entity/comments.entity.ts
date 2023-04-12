import { ProductEntity } from '../../products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { UserEntity } from 'src/components/user/entity/user.entity';

@Entity()
export class CommentsEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'text', default: null })
  comment_data: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn()
  product: number;

  @Column({ type: 'text', nullable: false })
  product_paypal_id: string;
}
