import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { UserEntity } from 'src/components/user/entity/user.entity';

export default class PostCommetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment_data: string;

  @ApiProperty()
  product?: ProductEntity;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty()
  user?: UserEntity;
}
