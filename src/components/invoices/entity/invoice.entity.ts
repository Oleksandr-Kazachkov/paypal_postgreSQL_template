import { OrderEntity } from 'src/components/order/entity/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'json', nullable: false })
  data: object;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity | number;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'text', default: new Date().toISOString() })
  created_at: Date;
}
