import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_telegram')
export class UserTelegramEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int', default: null })
  chatId: number;

  @Column({ type: 'text', nullable: false })
  first_name: string;

  @Column({ type: 'text', default: null })
  username: string;

  @Column({ type: 'text', default: null })
  telegram_token: string;
}
