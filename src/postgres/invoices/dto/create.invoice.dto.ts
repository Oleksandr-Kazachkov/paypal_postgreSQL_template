import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/postgres/order/entity/order.entity';

export default class createInvoiceDto {
  @ApiProperty()
  order: Order;

  @ApiProperty()
  data: object;
}
