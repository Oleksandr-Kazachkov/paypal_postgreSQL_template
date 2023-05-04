import { Body, Controller, Get, Post } from '@nestjs/common';
import FindOrderPriceDto from './dto/find.order.price.dto';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceService } from './invoice.service';

@Controller('/invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly invoiceService: InvoiceService,
  ) {}

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

  @Get('/find-many-with-status')
  async findManyWithStatus() {
    return this.invoiceRepository.findManyWithStatus();
  }

  @Post('/bulc-invoices')
  async bulcOrderProduct() {
    return await this.invoiceService.bulcInvoices();
  }
}
