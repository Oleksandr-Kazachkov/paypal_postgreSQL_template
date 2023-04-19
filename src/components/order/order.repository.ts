import { Inject, Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import CreateOrderDto from './dto/create.order.dto';
import { FakerService } from 'src/utils/faker/faker.service';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<OrderEntity>,
    private readonly fakerService: FakerService,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async saveOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity | undefined> {
    return await this.orderRepository.save(createOrderDto);
  }

  async findOneOrderById(userId: number): Promise<OrderEntity | undefined> {
    return this.orderRepository.findOne({
      where: { user: userId },
    });
  }

  async updateOrderStatus(Order: OrderEntity, status: string) {
    return await this.orderRepository.update(Order, { status: status });
  }

  async findOneWithInvoice(orderId: number) {
    return await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['invoice'],
    });
  }

  async findManyWithStatus(status: string) {
    return await this.orderRepository.findBy({
      status: status,
    });
  }

  async findOrderByPrice(prices: any) {
    return await this.orderRepository.find({
      where: {
        invoice: {
          price: Between(prices.lowerPrice, prices.upperPrice),
        },
      },
    });
  }

  async findOrdersWithProductMoreOne() {
    return await this.orderRepository.find({
      relations: ['order_products'],
      where: {
        order_products: {
          product: true,
        },
      },
    });
  }

  async createOrders(userAmount: any) {
    for (let i = 0; i < userAmount.amount; i++) {
      await this.saveOrder(this.fakerService.createRandomOrder());
    }
  }

  async getSpendAllTime(userId: number) {
    return this.orderRepository
      .createQueryBuilder('order')
      .select('sum(invoice.price)/100 as sum')
      .leftJoin('invoice', 'invoice', 'invoice."orderId" = "order".id')
      .where('"order"."userId" = :id', { id: userId })
      .execute()
      .then(([result]) => result?.sum) as Promise<number>;
  }

  async getGraphForPieByOrderStatus() {
    const labels = ['COMPLETED', 'PENDING'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
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
        },
      ],
    };

    const orders = await this.orderRepository.find();
    const length = [];

    labels.map((el) => {
      return length.push(
        orders.filter((element) => el === element.status).length,
      );
    });

    length.forEach((el) => {
      data.datasets[0].data.push(el);
    });

    return data;
  }
}
