import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import createInvoiceDto from './dto/create.invoice.dto';
import { Invoice } from './entity/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('INVOICE_REPOSITORY')
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  async createInvoice(createInvoiceDto: createInvoiceDto) {
    return await this.invoiceRepository.save(createInvoiceDto);
  }
}
