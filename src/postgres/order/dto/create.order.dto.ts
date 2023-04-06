import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/postgres/products/entity/product.entity';
import { User } from 'src/postgres/user/entity/user.entity';

export default class createOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user?: User;

  @ApiProperty()
  @IsString()
  user_paypal_id: string;

  @ApiProperty()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsString()
  product_id: string;

  @ApiProperty()
  product?: Product;
}
