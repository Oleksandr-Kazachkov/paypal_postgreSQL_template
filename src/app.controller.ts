import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceService } from 'src/postgres/invoices/invoice.service';
import { OrderService } from 'src/postgres/order/order.service';
import { UserService } from 'src/postgres/user/user.service';
import { PaypalService } from './paypal/paypal.service';
import CreateOrderDto from './postgres/order/dto/create.order.dto';
import CreateProductDto from './postgres/products/dto/create.product.dto';
import { ProductService } from './postgres/products/product.service';

@Controller()
export class AppController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly orderService: OrderService,
    private readonly invoiceService: InvoiceService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Post('/createOrder')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOne(createOrderDto.user_paypal_id);

    await this.orderService.createOrder({
      user: user,
      user_paypal_id: createOrderDto.user_paypal_id,
      status: 'Pending',
      product_id: createOrderDto.product_id,
    });

    const product = await this.productService.findOne(
      createOrderDto.product_id,
    );

    createOrderDto.product = product;

    return await this.paypalService.createOrder(createOrderDto);
  }

  @Post('/createProduct')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Post('/getProduct')
  async getProduct(@Body('productId') productId: string) {
    return await this.paypalService.getProduct(productId);
  }

  @Post('/capturePayment')
  async capturePayment(@Body() body: any) {
    const response = await this.paypalService.capturePayment(body);

    console.log(response);

    if (response.payer.payer_id) {
      const order = await this.orderService.findOneOrderByUserId(
        response.payer.payer_id,
      );

      await this.orderService.updateOrderStatus(order, response.status);

      await this.invoiceService.createInvoice({
        data: response,
        order: order,
      });
    }

    return body;
  }

  @Post('/capturePaypalPayment')
  async capturePaypalPayment(@Body() body: any) {
    return await this.paypalService.capturePaypalOrder(body.id);
  }
}