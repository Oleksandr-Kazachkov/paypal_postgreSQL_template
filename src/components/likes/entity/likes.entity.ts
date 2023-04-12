import { ProductEntity } from '../../products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { UserEntity } from 'src/components/user/entity/user.entity';

@Entity()
export class LikesEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: number;

  @OneToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn()
  product: number;

  @Column({ type: 'text', nullable: false })
  product_paypal_id: string;
}
