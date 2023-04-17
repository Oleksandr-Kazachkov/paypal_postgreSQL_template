import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { OrderEntity } from './order.entity';

@Entity('order_products')
export class OrderProductsEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn()
  product: ProductEntity;
}
