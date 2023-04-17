import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/components/user/entity/user.entity';

export default class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user?: UserEntity;

  @ApiProperty()
  @IsString()
  user_paypal_id: string;

  @ApiProperty()
  @IsString()
  status?: string;

  @ApiProperty()
  product_id?: Array<string>;

  @ApiProperty()
  product?: { price: string; currency: string };
}
