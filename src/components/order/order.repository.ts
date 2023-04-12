import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import CreateOrderDto from './dto/create.order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async saveOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity | undefined> {
    return this.orderRepository.save(createOrderDto);
  }

  async findOneOrderByUserId(
    user_paypal_id: string,
  ): Promise<OrderEntity | undefined> {
    return this.orderRepository.findOne({
      where: { user_paypal_id: user_paypal_id },
    });
  }

  async updateOrderStatus(Order: OrderEntity, status: string) {
    return await this.orderRepository.update(Order, { status: status });
  }
}
