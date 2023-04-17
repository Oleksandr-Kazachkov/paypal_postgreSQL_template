import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/components/user/entity/user.entity';

@Entity('settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user?: UserEntity;

  @Column()
  user_paypal_id: string;

  @Column({ type: 'boolean', nullable: false })
  email_notifications: boolean;

  @Column({ type: 'boolean', nullable: false })
  push_notifications: boolean;
}
