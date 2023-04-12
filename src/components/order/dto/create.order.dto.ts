import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { UserEntity } from 'src/components/user/entity/user.entity';

export default class createOrderDto {
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
  @IsString()
  product_id: string;

  @ApiProperty()
  product?: ProductEntity;
}
