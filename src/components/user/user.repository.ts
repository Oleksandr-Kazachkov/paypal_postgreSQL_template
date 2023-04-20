import { Inject, Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import CreateUserDto from './dto/create.user.dto';
import { FakerService } from 'src/utils/faker/faker.service';
import { DataSource } from 'typeorm';
import { SettingsEntity } from '../settings/entity/settings.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    private readonly fakerService: FakerService,
  ) {}

  async findOneById(userId: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async save(createUserDto: CreateUserDto): Promise<UserEntity> {
    let user;

    await this.dataSource.transaction(async (manager) => {
      user = await manager.save(UserEntity, createUserDto);
      await manager.save(SettingsEntity, {
        user: user,
        user_paypal_id: user.user_paypal_id,
        email_notifications: createUserDto.email_notifications,
        push_notifications: createUserDto.push_notifications,
      });
    });

    return user;
  }

  async createUsers(userAmount: any) {
    for (let i = 0; i < userAmount.amount; i++) {
      await this.userRepository.save(this.fakerService.createRandomUser());
    }
  }

  async findOneWithSettings(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['settings'],
    });
  }

  async findOneWithOrders(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['orders'],
    });
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
      label: 'My First Dataset',
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

    const users = await this.userRepository.find({
      where: {
        created_at: LessThan(new Date(`December 31, ${year.year} 23:59:59 `)),
      },
      order: {
        created_at: 'ASC',
      },
    });

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
}
