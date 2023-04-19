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
    for (let i = 0; i < userAmount.amount; i++) {
      await this.save(this.fakerService.createRandomInvoice());
    }
  }

  async findManyWithStatus() {
    const response = [];
    const [countInfo, entities] = await Promise.all([
      this.invoiceRepository
        .createQueryBuilder()
        .select('status')
        .addSelect('COUNT(*)', 'count')
        .groupBy('status')
        .getRawMany(),
      this.invoiceRepository.find(),
    ]);

    countInfo.filter((element) => {
      response.push({
        status: element.status,
        count: element.count,
        objects: entities.filter(
          (el) => element.status === el.status,
          [].push(element),
        ),
      });
    });

    return response;
  }
}
