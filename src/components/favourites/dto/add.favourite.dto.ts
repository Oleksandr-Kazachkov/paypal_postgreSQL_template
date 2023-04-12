import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { UserEntity } from 'src/components/user/entity/user.entity';

export default class AddToFavouriteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userPaypalId: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  user?: UserEntity;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  product?: ProductEntity;
}
