import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { OrderEntity } from '../entity/order.entity';

export default class CreateOrderProductsDto {
  @ApiProperty()
  order: OrderEntity;

  @ApiProperty()
  product: ProductEntity;
}
