import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { OrderRepository } from '../order/order.repository';

@Injectable()
export class ElasticService {
  constructor(
    private readonly elasticSearchService: ElasticsearchService,
    private readonly orderRepository: OrderRepository,
  ) {}

  async bulcItems(operations: any) {
    await this.elasticSearchService.bulk({ refresh: true, operations });
  }

  async getRatedOrders(orderId: number) {
    const order = await this.orderRepository.findOneByOrderId(orderId);

    return await this.elasticSearchService.search({
      index: 'orders',
      query: {
        function_score: {
          query: {
            match_all: {},
          },
          functions: [
            {
              filter: {
                match: {
                  status: order.status,
                },
              },
              weight: 2.0,
            },
            {
              filter: {
                match: {
                  userId: order.user.id,
                },
              },
              weight: 2.0,
            },
            {
              filter: {
                match: {
                  productId: 1,
                },
              },
              weight: 2.0,
            },
            {
              filter: {
                match: {
                  productId: 2,
                },
              },
              weight: 2.0,
            },
          ],
          score_mode: 'sum',
        },
      },
      sort: [
        {
          _score: {
            order: 'desc',
          },
        },
      ],
      indices_boost: [
        {
          orders: 12.5,
        },
      ],
    });
  }
}
