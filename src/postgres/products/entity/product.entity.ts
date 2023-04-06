import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  price: string;

  @Column()
  currency: string;

  @Column({ default: null })
  product_paypal_id: string;
}
