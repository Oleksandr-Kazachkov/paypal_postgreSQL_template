import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserTelegramDto {
  @ApiProperty()
  chatId?: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ApiProperty()
  @IsString()
  telegram_token?: string;
}
