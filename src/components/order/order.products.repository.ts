import { Inject, Injectable } from '@nestjs/common';
import { FakerService } from 'src/utils/faker/faker.service';
import { Repository } from 'typeorm';
import CreateOrderProductsDto from './dto/create.order.products.dto';
import { OrderEntity } from './entity/order.entity';
import { OrderProductsEntity } from './entity/order.products.entity';

@Injectable()
export class OrderProductsRepository {
  constructor(
    @Inject('ORDER_PRODUCTS_REPOSITORY')
    private orderProductsRepository: Repository<OrderProductsEntity>,
    private readonly fakerService: FakerService,
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

  async createOrderProducts(userAmount: any) {
    for (let i = 0; i < userAmount.amount; i++) {
      await this.save(this.fakerService.createRandomOrderProducts());
    }
  }

  async leastProducts() {
    return this.orderProductsRepository.query(
      `select
      *
    from
      (
      select
        COUNT(*) as "count",
        "productId"
      from
        "order_products" "op"
      group by
        "productId") "aggr"
    left join "product" "product" on
        "product"."id" =
      aggr."productId"
    where
      count = (
      select
        MIN(count)
      from
        (
        select
          COUNT(*) as "count",
          "productId"
        from
          "order_products" "op"
        group by
          "productId"
        ) "sq"
      )
    group by
      count,
      "productId",
      product.id`,
    );
  }

  async mostProducts() {
    return this.orderProductsRepository.query(
      `select
      *
    from
      (
      select
        COUNT(*) as "count",
        "productId"
      from
        "order_products" "op"
      group by
        "productId") "aggr"
    left join "product" "product" on
        "product"."id" =
      aggr."productId"
    where
      count = (
      select
        MAX(count)
      from
        (
        select
          COUNT(*) as "count",
          "productId"
        from
          "order_products" "op"
        group by
          "productId"
        ) "sq"
      )
    group by
      count,
      "productId",
      product.id`,
    );
  }
}
