import { Order } from 'src/postgres/order/entity/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  data: object;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn()
  order: Order;
}
