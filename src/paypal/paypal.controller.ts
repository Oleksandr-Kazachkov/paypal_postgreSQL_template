import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceService } from 'src/components/invoices/invoice.service';
import { OrderRepository } from 'src/components/order/order.repository';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { PaypalService } from './paypal.service';

@Controller()
export class PaypalController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly orderRepository: OrderRepository,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Post('/get-product')
  async getProduct(
    @Body('productId') productId: string,
  ): Promise<ProductEntity> {
    return await this.paypalService.getProduct(productId);
  }

  @Post('/capturePayment')
  async capturePayment(@Body() body: any) {
    const response = await this.paypalService.capturePayment(body);

    console.log(response);

    if (response.payer.payer_id) {
      const order = await this.orderRepository.findOneOrderByUserId(
        response.payer.payer_id,
      );

      await this.orderRepository.updateOrderStatus(order, response.status);

      await this.invoiceService.createInvoice({
        data: response,
        order: order,
      });
    }

    return body;
  }

  @Post('/capture-paypal-payment')
  async capturePaypalPayment(@Body() body: any) {
    console.log(body);
    return await this.paypalService.capturePaypalOrder(body.id);
  }
}
