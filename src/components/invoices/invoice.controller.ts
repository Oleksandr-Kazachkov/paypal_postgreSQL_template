import { Body, Controller, Get, Post } from '@nestjs/common';
import FindOrderPriceDto from './dto/find.order.price.dto';
import { InvoiceRepository } from './invoice.repository';

@Controller('/invoices')
export class InvoiceController {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  @Get('/find-many-with-order-status')
  async findManyWithOrderPrice(@Body() findOrderPriceDto: FindOrderPriceDto) {
    return await this.invoiceRepository.findManyWithStatusAndPrice(
      findOrderPriceDto,
    );
  }

  @Post('/create-random-invoice')
  async createRandomInvoice(@Body() amount: number) {
    const response = await this.invoiceRepository.createInvoices(amount);

    return response;
  }
}
