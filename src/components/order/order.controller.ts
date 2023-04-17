import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateOrderDto from './dto/create.order.dto';
import { OrderService } from './order.service';
import { ProductRepository } from '../products/product.repository';
import { OrderRepository } from './order.repository';
import { UserRepository } from '../user/user.repository';
import Decimal from 'decimal.js';
import { OrderProductsRepository } from './order.products.repository';
@Controller('/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly orderProductsRepository: OrderProductsRepository,
  ) {}

  @Post('/create-order')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOneById(
      createOrderDto.user_paypal_id,
    );

    const order = await this.orderRepository.saveOrder({
      user: user,
      user_paypal_id: createOrderDto.user_paypal_id,
      status: 'PENDING',
    });

    const products = {
      price: '0',
      currency: 'usd',
    };

    await Promise.all(
      createOrderDto.product_id.map(async (el) => {
        const product = await this.productRepository.findOne(el);
        await this.orderProductsRepository.save({
          order: order,
          product: product,
        });
        const priceProduct = new Decimal(product.price);
        const sum = new Decimal(product.price);
        products.price = Decimal.add(sum, priceProduct).toString();
      }),
    );

    createOrderDto.product = products;

    return await this.orderService.createOrder(createOrderDto);
  }

  @Get('/find-one-with-invoices/:orderId')
  async findOneWithInvoices(@Param('orderId') orderId: number) {
    return await this.orderRepository.findOneWithInvoice(orderId);
  }

  @Get('/find-many-with-status/:status')
  async findManyWithStatus(@Param('status') status: string) {
    return await this.orderRepository.findManyWithStatus(status);
  }

  @Get('/order-by-price/:price')
  async getOrderByPrice(@Param('price') price: number) {
    return await this.orderRepository.findOrderByPrice(price);
  }

  @Get('/order-by-amount-products/:orderId')
  async findOrderProductsMoreOne() {
    return await this.orderProductsRepository.getCount();
  }

  @Post('/create-random-orders')
  async createRandomOrders(@Body() amount: number) {
    const response = await this.orderRepository.createOrders(amount);

    return response;
  }
}
