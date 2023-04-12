import { ProductEntity } from 'src/components/products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('favourites')
export class FavouritesEntity {
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
