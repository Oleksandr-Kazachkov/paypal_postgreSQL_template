import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ElasticService } from '../elasticSearch/elasticSearch.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly elasticSearchService: ElasticService,
  ) {}

  googleLogin(req) {
    console.log(req);
    // if (!req.user) {
    //   return 'No user from google';
    // }

    console.log('here2');

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async usersByMonth(year: any): Promise<any> {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dataset = {
      label: 'User month',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    const data = {
      labels: labels,
      datasets: [],
    };

    const users = await this.userRepository.findByTime(year);

    let month1 = 0;
    let month2 = 2;

    users.forEach((el) => {
      if (new Date(el.created_at).getMonth() + 1 >= month2) {
        month1++;
        month2++;
      }

      if (
        month1 < new Date(el.created_at).getMonth() + 1 &&
        month2 > new Date(el.created_at).getMonth() + 1
      ) {
        dataset.data[month1] = dataset.data[month1] + 1;
      }
    });

    data.datasets.push(dataset);

    return data;
  }

  async migrateData() {
    const users = await this.userRepository.findAll();

    const operations = users.flatMap((doc) => [
      { index: { _index: 'users' } },
      {
        id: doc.id,
        user_paypal_id: doc.user_paypal_id,
        nama: doc.name,
        email: doc.email,
        password: doc.password,
        likes: doc.likes,
        comments: doc.comments,
        settings: doc.settings,
        orders: doc.orderId,
        created_at: doc.created_at,
        updated_at: doc.updated_at,
      },
    ]);

    await this.elasticSearchService.bulcItems(operations);
  }
}
