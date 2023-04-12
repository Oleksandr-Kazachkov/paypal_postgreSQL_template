import { Body, Controller, Post } from '@nestjs/common';
import CreateOrderDto from './dto/create.order.dto';
import { OrderService } from './order.service';
import { OrderEntity } from './entity/order.entity';
import { ProductRepository } from '../products/product.repository';
import { OrderRepository } from './order.repository';
import { UserRepository } from '../user/user.repository';

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('/create-order')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const user = await this.userRepository.findOneById(
      createOrderDto.user_paypal_id,
    );

    await this.orderRepository.saveOrder({
      user: user,
      user_paypal_id: createOrderDto.user_paypal_id,
      status: 'PENDING',
      product_id: createOrderDto.product_id,
    });

    const product = await this.productRepository.findOne(
      createOrderDto.product_id,
    );

    createOrderDto.product = product;

    return await this.orderService.createOrder(createOrderDto);
  }
}
