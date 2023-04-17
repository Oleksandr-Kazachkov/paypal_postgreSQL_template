import { ApiProperty } from '@nestjs/swagger';

export default class findOrderPriceDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  price: number;
}
