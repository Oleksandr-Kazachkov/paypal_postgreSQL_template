import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/components/user/entity/user.entity';
import { ProductEntity } from '../../products/entity/product.entity';

export default class PostLikeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty()
  product: ProductEntity;

  @ApiProperty()
  user?: UserEntity;
}
