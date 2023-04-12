import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PaypalService } from 'src/paypal/paypal.service';
import createOrderDto from './dto/create.order.dto';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly paypalService: PaypalService,
    private readonly httpService: HttpService,
  ) {}

  async createOrder(createOrderDto: createOrderDto): Promise<OrderEntity> {
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
                value: createOrderDto.product.price,
              },
            },
          ],
        },
        { headers: headers },
      ),
    );

    const data = await response.data;

    return data;
  }
}
