import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from 'src/components/order/entity/order.entity';

export default class createInvoiceDto {
  @ApiProperty()
  order: OrderEntity;

  @ApiProperty()
  data: object;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status: string;
}
