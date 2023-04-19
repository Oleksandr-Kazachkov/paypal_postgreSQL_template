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

  @ManyToMany(
    () => OrderProductsEntity,
    (order_products) => order_products.product,
  )
  order_products: OrderProductsEntity | number;

  @Column({ type: 'text', default: new Date().toISOString() })
  created_at: Date;

  @Column({ type: 'text', default: new Date().toISOString() })
  updated_at: Date;
}
