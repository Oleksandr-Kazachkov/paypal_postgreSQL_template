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

  async findByName(name: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ name: name });
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

  async findByTime(year) {
    return await this.userRepository.find({
      where: {
        created_at: LessThan(new Date(`December 31, ${year.year} 23:59:59 `)),
      },
      order: {
        created_at: 'ASC',
      },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }
}
