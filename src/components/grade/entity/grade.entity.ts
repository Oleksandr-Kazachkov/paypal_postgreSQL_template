import { ProductEntity } from '../../products/entity/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  OneToOne,
} from 'typeorm';
import { UserEntity } from 'src/components/user/entity/user.entity';

@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn()
  product: number;

  @Column({ type: 'text', nullable: false })
  product_paypal_id: string;

  @Column({ type: 'int', nullable: false })
  grade: number;
}
