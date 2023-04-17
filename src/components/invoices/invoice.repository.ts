import { Inject, Injectable } from '@nestjs/common';
import { FakerService } from 'src/utils/faker/faker.service';
import { Repository } from 'typeorm';
import CreateInvoiceDto from './dto/create.invoice.dto';
import findOrderPriceDto from './dto/find.order.price.dto';
import { InvoiceEntity } from './entity/invoice.entity';

@Injectable()
export class InvoiceRepository {
  constructor(
    @Inject('INVOICE_REPOSITORY')
    private invoiceRepository: Repository<InvoiceEntity>,
    private readonly fakerService: FakerService,
  ) {}

  async findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.find();
  }

  async save(createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceRepository.save(createInvoiceDto);
  }

  findManyWithStatusAndPrice(findOrderPriceDto: findOrderPriceDto) {
    return this.invoiceRepository.find({
      where: {
        price: findOrderPriceDto.price,
        status: findOrderPriceDto.status,
      },
      relations: ['order'],
    });
  }

  async createInvoices(userAmount: any) {
    const invoices = [];

    for (let i = 0; i < userAmount.amount; i++) {
      const user = this.fakerService.createRandomInvoice();
      invoices.push(user);
    }

    return invoices.forEach(async () => {
      await this.invoiceRepository.save(
        this.fakerService.createRandomInvoice(),
      );
    });
  }
}
