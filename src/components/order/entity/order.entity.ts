import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from 'src/components/user/entity/user.entity';
import { InvoiceEntity } from 'src/components/invoices/entity/invoice.entity';
import { OrderProductsEntity } from './order.products.entity';
import { ProductEntity } from 'src/components/products/entity/product.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity | number;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.order)
  invoice: InvoiceEntity | number;

  @Column({ default: 'PENDING', nullable: false, type: 'varchar' })
  status: string;

  @ManyToMany(() => ProductEntity, (product) => product.order)
  @JoinColumn()
  order_products: OrderProductsEntity | ProductEntity;

  @Column({ type: 'text', default: new Date().toISOString() })
  created_at: Date;

  @Column({ type: 'text', default: new Date().toISOString() })
  updated_at: Date;
}
