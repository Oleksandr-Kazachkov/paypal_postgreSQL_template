import { Module } from '@nestjs/common';
import { ElasticService } from './elasticSearch.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderRepository } from '../order/order.repository';
import { orderProviders } from '../order/providers/order.provider';
import { FakerService } from 'src/utils/faker/faker.service';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { ElasticController } from './elasticSearch.controller';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ElasticService,
    OrderRepository,
    ...orderProviders,
    FakerService,
    ...databaseProviders,
  ],
  exports: [ElasticService],
  controllers: [ElasticController],
})
export class ElasticSearchModule {}
