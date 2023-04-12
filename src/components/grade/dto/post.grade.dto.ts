import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { UserEntity } from 'src/components/user/entity/user.entity';

export default class PostGradeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  grade: number;

  @ApiProperty()
  product?: ProductEntity;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty()
  user?: UserEntity;
}
