import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Order } from 'src/postgres/order/entity/order.entity';

export default class createInvoiceDto {
  @ApiProperty()
  @IsString()
  order: Order;

  @ApiProperty()
  @IsString()
  data: object;
}
