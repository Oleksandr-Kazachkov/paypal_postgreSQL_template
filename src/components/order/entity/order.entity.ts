import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/components/user/entity/user.entity';
import { InvoiceEntity } from 'src/components/invoices/entity/invoice.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.order)
  invoice: InvoiceEntity;

  @Column({ type: 'varchar', nullable: false })
  user_paypal_id: string;

  @Column({ default: 'PENDING', nullable: false, type: 'varchar' })
  status: string;
}
