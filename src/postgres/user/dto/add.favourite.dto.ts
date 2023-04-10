import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/postgres/products/entity/product.entity';

export default class AddToFavouriteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userPaypalId: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  product?: Product;
}
