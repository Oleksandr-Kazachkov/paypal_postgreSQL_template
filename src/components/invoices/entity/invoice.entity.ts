import { OrderEntity } from 'src/components/order/entity/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'json', nullable: false })
  data: object;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity;
}
