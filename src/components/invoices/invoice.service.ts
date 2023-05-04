import { Injectable } from '@nestjs/common';
import createInvoiceDto from './dto/create.invoice.dto';
import { InvoiceEntity } from './entity/invoice.entity';
import { InvoiceRepository } from './invoice.repository';
import { ElasticService } from '../elasticSearch/elasticSearch.service';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly elasticSearchService: ElasticService,
  ) {}

  async findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.findAll();
  }

  async createInvoice(
    createInvoiceDto: createInvoiceDto,
  ): Promise<InvoiceEntity> {
    return await this.invoiceRepository.save(createInvoiceDto);
  }

  async bulcInvoices() {
    const invoices = await this.invoiceRepository.findAll();

    const operations = invoices.flatMap((doc) => [
      { index: { _index: 'invoices' } },
      {
        id: doc.id,
        data: doc.data,
        order: doc.order,
        price: doc.price,
        status: doc.status,
        created_at: doc.created_at,
      },
    ]);

    await this.elasticSearchService.bulcItems(operations);
  }
}
