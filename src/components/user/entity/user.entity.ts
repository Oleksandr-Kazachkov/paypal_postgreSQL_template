import { CommentsEntity } from 'src/components/comments/entity/comments.entity';
import { LikesEntity } from 'src/components/likes/entity/likes.entity';
import { OrderEntity } from 'src/components/order/entity/order.entity';
import { SettingsEntity } from 'src/components/settings/entity/settings.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ default: null, type: 'varchar' })
  user_paypal_id: string;

  @Column({ length: 500, type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => LikesEntity, (likes) => likes.user)
  likes: LikesEntity | number;

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity | number;

  @OneToOne(() => SettingsEntity, (settings) => settings.user)
  settings: SettingsEntity | number;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity | number;

  @Column({ type: 'text', default: new Date().toISOString() })
  created_at: Date;

  @Column({ type: 'text', default: new Date().toISOString() })
  updated_at: Date;
}
