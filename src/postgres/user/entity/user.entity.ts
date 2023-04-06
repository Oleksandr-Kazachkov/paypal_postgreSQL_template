import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  user_paypal_id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
