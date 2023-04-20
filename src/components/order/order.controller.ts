import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import CreateOrderDto from './dto/create.order.dto';
import { OrderService } from './order.service';
import { ProductRepository } from '../products/product.repository';
import { OrderRepository } from './order.repository';
import { UserRepository } from '../user/user.repository';
import Decimal from 'decimal.js';
import { OrderProductsRepository } from './order.products.repository';
import GetOrdersByTimeDto from './dto/get.order.by.time.dto';
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
    const user = await this.userRepository.findOneById(createOrderDto.user);

    const order = await this.orderRepository.saveOrder({
      user: user.id,
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
        const priceProduct = new Decimal(product.price / 100);
        const sum = new Decimal(product.price);
        products.price = Decimal.add(sum, priceProduct).toString();
      }),
    );

    createOrderDto.product = products;

    return await this.orderService.createOrder(createOrderDto, order);
  }

  @Get('/find-one-with-invoices/:orderId')
  async findOneWithInvoices(@Param('orderId') orderId: number) {
    return await this.orderRepository.findOneWithInvoice(orderId);
  }

  @Get('/find-many-with-status/:status')
  async findManyWithStatus(@Param('status') status: string) {
    return await this.orderRepository.findManyWithStatus(status);
  }

  @Get('/order-by-price')
  async getOrderByPrice(@Body() prices: number) {
    return await this.orderRepository.findOrderByPrice(prices);
  }

  @Get('/order-by-amount-products/:orderId')
  async findOrderProductsMoreOne() {
    return await this.orderProductsRepository.getCount();
  }

  @Post('/create-random-orders')
  async createRandomOrders(@Body() amount: number) {
    try {
      await this.orderRepository.createOrders(amount);
    } catch (err) {}
  }

  @Post('/create-random-order-products')
  async createRandomOrderProducts(@Body() amount: number) {
    try {
      await this.orderProductsRepository.createOrderProducts(amount);
    } catch (err) {}
  }

  @Get('/user-spend-all-time')
  async getUserSpendAllTime(@Query('userId') userId: number) {
    return await this.orderRepository.getSpendAllTime(userId);
  }

  @Get('/get-least-products')
  async getLeastProducts() {
    return await this.orderProductsRepository.leastProducts();
  }

  @Get('/get-most-products')
  async getMaxProducts() {
    return await this.orderProductsRepository.mostProducts();
  }

  @Get('/get-graph-for-pie-order-status')
  async getGraphForPieByOrderStatus() {
    return await this.orderRepository.getGraphForPieByOrderStatus();
  }

  @Get('/get-orders-by-time')
  async getOrdersByTime(@Body() dates: GetOrdersByTimeDto) {
    return await this.orderRepository.getOrdersByTime(dates);
  }
}
