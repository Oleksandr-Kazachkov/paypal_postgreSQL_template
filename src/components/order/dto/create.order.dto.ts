import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: number;

  @ApiProperty()
  @IsString()
  status?: string;

  @ApiProperty()
  product_id?: Array<number>;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  product?: { price: string; currency: string };
}
