import { Inject, Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import CreateOrderDto from './dto/create.order.dto';
import { FakerService } from 'src/utils/faker/faker.service';

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

  async saveOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity | undefined> {
    return await this.orderRepository.save(createOrderDto);
  }

  async findOneOrderByOrderId(
    user_paypal_id: string,
  ): Promise<OrderEntity | undefined> {
    return this.orderRepository.findOne({
      where: { user_paypal_id: user_paypal_id },
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

  async findOrderByPrice(price: number) {
    return await this.orderRepository.find({
      where: {
        invoice: {
          price: LessThan(price),
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
    const orders = [];

    for (let i = 0; i < userAmount.amount; i++) {
      const user = this.fakerService.createRandomOrder();
      orders.push(user);
    }

    return orders.forEach(async () => {
      await this.orderRepository.save(this.fakerService.createRandomOrder());
    });
  }
}
