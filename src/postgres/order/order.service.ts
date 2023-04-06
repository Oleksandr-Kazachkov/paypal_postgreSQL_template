import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import createOrderDto from './dto/create.order.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async createOrder(
    createOrderDto: createOrderDto,
  ): Promise<Order | undefined> {
    return this.orderRepository.save(createOrderDto);
  }

  async findOneOrderByUserId(
    user_paypal_id: string,
  ): Promise<Order | undefined> {
    return this.orderRepository.findOne({
      where: { user_paypal_id: user_paypal_id },
    });
  }

  async updateOrderStatus(Order: Order, status: string) {
    return await this.orderRepository.update(Order, { status: status });
  }
}
