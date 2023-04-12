import { Injectable } from '@nestjs/common';
import createInvoiceDto from './dto/create.invoice.dto';
import { InvoiceEntity } from './entity/invoice.entity';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.findAll();
  }

  async createInvoice(
    createInvoiceDto: createInvoiceDto,
  ): Promise<InvoiceEntity> {
    return await this.invoiceRepository.save(createInvoiceDto);
  }
}
