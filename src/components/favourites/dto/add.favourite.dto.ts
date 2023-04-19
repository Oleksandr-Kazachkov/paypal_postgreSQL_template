import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ProductEntity } from 'src/components/products/entity/product.entity';

export default class AddToFavouriteDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  user?: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  product?: ProductEntity;
}
