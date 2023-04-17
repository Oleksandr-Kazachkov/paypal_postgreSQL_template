import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateOrderProductsDto from './dto/create.order.products.dto';
import { OrderEntity } from './entity/order.entity';
import { OrderProductsEntity } from './entity/order.products.entity';

@Injectable()
export class OrderProductsRepository {
  constructor(
    @Inject('ORDER_PRODUCTS_REPOSITORY')
    private orderProductsRepository: Repository<OrderProductsEntity>,
  ) {}

  async save(createOrderProductsDto: CreateOrderProductsDto) {
    return this.orderProductsRepository.save(createOrderProductsDto);
  }

  async getCount() {
    return this.orderProductsRepository
      .createQueryBuilder()
      .select('COUNT("productId")', 'productsCount')
      .leftJoinAndMapOne('order', OrderEntity, 'order', 'order.id = "orderId"')
      .groupBy('order.id')
      .having('COUNT("productId") > 1')
      .getRawMany();
  }
}
