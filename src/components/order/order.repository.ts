import { Inject, Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import CreateOrderDto from './dto/create.order.dto';
import { FakerService } from 'src/utils/faker/faker.service';
import GetOrdersByTimeDto from './dto/get.order.by.time.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<OrderEntity>,
    private readonly fakerService: FakerService,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async findAllWithRelations() {
    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    queryBuilder
      .select(
        'order.id, order.status, order.userId, op.productId , order.created_at, order.updated_at',
      )
      .leftJoin('order_products', 'op', 'op."orderId" = order.id');

    return queryBuilder.getRawMany();
  }

  async saveOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity | undefined> {
    return await this.orderRepository.save(createOrderDto);
  }

  async findOneOrderById(userId: number): Promise<OrderEntity | undefined> {
    return this.orderRepository.findOne({
      where: { user: userId },
    });
  }

  async findOneByOrderId(orderId: number): Promise<any> {
    return this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['user'],
    });
  }

  async updateOrderStatus(Order: OrderEntity, status: string) {
    return await this.orderRepository.update(Order, { status: status });
  }

  async findOneWithInvoice(orderId: number) {
    return await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['invoice'],
    });
  }

  async findManyWithStatus(status: string) {
    return await this.orderRepository.findBy({
      status: status,
    });
  }

  async findOrderByPrice(prices: any) {
    return await this.orderRepository.find({
      where: {
        invoice: {
          price: Between(prices.lowerPrice, prices.upperPrice),
        },
      },
    });
  }

  async findOrdersWithProductMoreOne() {
    return await this.orderRepository.find({
      relations: ['order_products'],
      where: {
        order_products: {
          product: true,
        },
      },
    });
  }

  async createOrders(userAmount: any) {
    for (let i = 0; i < userAmount.amount; i++) {
      await this.saveOrder(this.fakerService.createRandomOrder());
    }
  }

  async getSpendAllTime(userId: number) {
    return this.orderRepository
      .createQueryBuilder('order')
      .select('sum(invoice.price)/100 as sum')
      .leftJoin('invoice', 'invoice', 'invoice."orderId" = "order".id')
      .where('"order"."userId" = :id', { id: userId })
      .execute()
      .then(([result]) => result?.sum) as Promise<number>;
  }

  async findByTime(getOrdersByTimeDto: GetOrdersByTimeDto) {
    return await this.orderRepository.find({
      where: {
        created_at: Between(
          getOrdersByTimeDto.dateMin,
          getOrdersByTimeDto.dateMax,
        ),
      },
    });
  }

  async test() {
    return this.orderRepository.find({
      relations: ['order_products'],
      loadRelationIds: {
        relations: ['productId'],
      },
    });
  }

  async findForReport() {
    // const data = `'${new Date().toISOString()}'`;
    const data = '2023-05-02T13:30:26.683Z';
    console.log(data);
    return this.orderRepository
      .createQueryBuilder()
      .select(
        `(
    SELECT COUNT(*)
    FROM "order" o
    WHERE o."created_at"::date = :data::date
  )`,
        'amountOfOrders',
      )
      .addSelect(
        `(
    SELECT SUM(i.price)
    FROM invoice i
    WHERE i."orderId" IN (
      SELECT o.id
      FROM "order" o
      WHERE o."created_at"::date = :data::date
    )
  ) / 100`,
        'orderPrice',
      )
      .addSelect(`ARRAY_AGG(DISTINCT product.name)`, 'ProductNames')
      .from('order_products', 'op')
      .innerJoin('op.order', 'o')
      .leftJoin('op.product', 'product')
      .where(`o."created_at"::date = :data::date`)
      .setParameter('data', data)
      .getRawOne();
  }
}
