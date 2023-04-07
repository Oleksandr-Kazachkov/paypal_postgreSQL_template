import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/postgres/user/entity/user.entity';
import { Invoice } from 'src/postgres/invoices/entity/invoice.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(() => Invoice, (invoice) => invoice.order)
  invoice: Invoice;

  @Column({ type: 'varchar', nullable: false })
  user_paypal_id: string;

  @Column({ default: 'PENDING', nullable: false, type: 'varchar' })
  status: string;
}
