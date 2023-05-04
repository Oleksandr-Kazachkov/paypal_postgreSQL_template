import { Controller, Get, Query } from '@nestjs/common';
import { ElasticService } from './elasticSearch.service';

@Controller('/elastic')
export class ElasticController {
  constructor(private readonly elasticService: ElasticService) {}

  @Get('/rated-orders')
  async ordersWithRate(@Query('orderId') orderId: number) {
    return await this.elasticService.getRatedOrders(orderId);
  }
}
