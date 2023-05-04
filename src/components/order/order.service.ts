import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PaypalService } from 'src/paypal/paypal.service';
import createOrderDto from './dto/create.order.dto';
import { OrderEntity } from './entity/order.entity';
import GetOrdersByTimeDto from './dto/get.order.by.time.dto';
import { OrderRepository } from './order.repository';
import { ElasticService } from '../elasticSearch/elasticSearch.service';
import { OrderProductsRepository } from './order.products.repository';
import { FakerService } from 'src/utils/faker/faker.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly paypalService: PaypalService,
    private readonly httpService: HttpService,
    private readonly orderRepository: OrderRepository,
    private readonly elasticSearchService: ElasticService,
    private readonly orderProductsRepository: OrderProductsRepository,
    private readonly fakerService: FakerService,
  ) {}

  async createOrder(
    createOrderDto: createOrderDto,
    order: OrderEntity,
  ): Promise<OrderEntity> {
    const baseURL = this.configService.get('SANDBOX');
    const accessToken = await this.paypalService.generateAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `${baseURL}/v2/checkout/orders`;
    const response = await firstValueFrom(
      this.httpService.post(
        url,
        {
          intent: 'CAPTURE',
          payer: {
            payment_method: 'paypal',
          },
          purchase_units: [
            {
              amount: {
                currency_code: createOrderDto.product.currency,
                value: createOrderDto.product.price.toString(),
              },
              reference_id: order.id,
            },
          ],
        },
        { headers: headers },
      ),
    );

    const data = await response.data;

    return data;
  }

  async getGraphForPieByOrderStatus() {
    const dataset = {
      label: 'Order status pie',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(100, 100, 100, 0.2)',
        'rgba(112, 112, 112, 0.2)',
        'rgba(129, 129, 129, 0.2)',
        'rgba(194, 194, 194, 0.2)',
        'rgba(201, 201, 201, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(100, 100, 100)',
        'rgb(112, 112, 112)',
        'rgb(129, 129, 129)',
        'rgb(194, 194, 194)',
        'rgb(201, 201, 201)',
      ],
      borderWidth: 1,
    };

    const labels = ['COMPLETED', 'PENDING'];
    const data = {
      labels: labels,
      datasets: [],
    };

    const orders = await this.orderRepository.findAll();
    const length = [];

    labels.map((el) => {
      return length.push(
        orders.filter((element) => el === element.status).length,
      );
    });

    length.forEach((el) => {
      dataset.data.push(el);
    });

    data.datasets.push(dataset);

    return data;
  }

  getMonth(monthMin: number, monthMax: number) {
    const response = [];

    for (let i = monthMin; i < monthMax; i++) {
      switch (i) {
        case 0:
          response.push('January');
          break;
        case 1:
          response.push('February');
          break;
        case 2:
          response.push('March');
          break;
        case 3:
          response.push('April');
          break;
        case 4:
          response.push('May');
          break;
        case 5:
          response.push('June');
          break;
        case 6:
          response.push('July');
          break;
        case 7:
          response.push('August');
          break;
        case 8:
          response.push('September');
          break;
        case 9:
          response.push('October');
          break;
        case 10:
          response.push('November');
          break;
        case 11:
          response.push('December');
          break;
      }
    }

    return response;
  }

  async getOrdersByTime(getOrdersByTimeDto: GetOrdersByTimeDto) {
    const data = {
      labels: [],
      datasets: [],
    };

    const dataset = {
      label: 'Order by time Line',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    };

    data.labels = this.getMonth(
      new Date(getOrdersByTimeDto.dateMin).getMonth(),
      new Date(getOrdersByTimeDto.dateMax).getMonth(),
    );

    const orders = await this.orderRepository.findByTime(getOrdersByTimeDto);

    data.labels.forEach(() => {
      dataset.data.push(0);
    });

    orders.forEach((el) => {
      if (new Date(el.created_at).getMonth() < data.labels.length) {
        dataset.data[new Date(el.created_at).getMonth()] =
          dataset.data[new Date(el.created_at).getMonth()] + 1;
      }
    });

    data.datasets.push(dataset);

    return data;
  }

  async migrateOrders() {
    const orders = await this.orderRepository.findAllWithRelations();

    orders.forEach((el) => {
      el.productId = this.fakerService.generateRandomArray();
    });

    const operations = orders.flatMap((doc) => [
      { index: { _index: 'orders' } },
      {
        id: doc.id,
        userId: doc.userId,
        invoice: doc.invoice,
        status: doc.status,
        order_products: doc.order_products,
        created_at: doc.created_at,
        updated_at: doc.updated_at,
        productId: doc.productId,
      },
    ]);

    await this.elasticSearchService.bulcItems(operations);
  }

  async migrateOrderProducts() {
    const order_products = await this.orderProductsRepository.findAll();

    const operations = order_products.flatMap((doc) => [
      { index: { _index: 'order_products' } },
      {
        id: doc.id,
        order: doc.order,
        product: doc.product,
      },
    ]);

    await this.elasticSearchService.bulcItems(operations);
  }
}
