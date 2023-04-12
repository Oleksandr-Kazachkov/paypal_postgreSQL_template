import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  price: string;

  @Column({ type: 'varchar', nullable: false })
  currency: string;

  @Column({ type: 'varchar', default: null })
  product_paypal_id: string;

  @Column({ type: 'int', default: 0 })
  amountOfLikes: number;

  @Column({ type: 'int', default: null })
  product_grade: number;
}