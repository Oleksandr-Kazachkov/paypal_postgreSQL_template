import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/components/user/entity/user.entity';

export default class createSettingsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user?: UserEntity;

  @ApiProperty()
  user_paypal_id: string;

  @ApiProperty()
  email_notifications: boolean;

  @ApiProperty()
  push_notifications: boolean;
}
