import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateInvoiceDto from './dto/create.invoice.dto';
import { InvoiceEntity } from './entity/invoice.entity';

@Injectable()
export class InvoiceRepository {
  constructor(
    @Inject('INVOICE_REPOSITORY')
    private invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.find();
  }

  async save(createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceRepository.save(createInvoiceDto);
  }
}
