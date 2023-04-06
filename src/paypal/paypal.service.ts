import { Injectable } from '@nestjs/common';
import createOrderDto from 'src/postgres/order/dto/create.order.dto';

@Injectable()
export class PaypalService {
  CLIENT_ID =
    'AToq7rxUeBG5O8zNK9NWVeHZoy1xZTcLLZkbBTtRpIHT-lIIiIQAi6GAXdyfVjtTir_U6M4tlMpOHWIL';
  APP_SECRET =
    'EP2cz7buJd4yXxu6gjVFzqcYA2tNZpG8WuCzaVZteWGwdyTv6AQ3OmLvkPyaq0fxwjw4W6BRoFvmhEUl';

  baseURL = {
    sandbox: 'https://api-m.sandbox.paypal.com',
    production: 'https://api-m.paypal.com',
  };

  async capturePaypalOrder(body: any) {
    const captureData = await this.capturePayment(body);

    return captureData;
  }

  async createOrder(createOrderDto: createOrderDto) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.baseURL.sandbox}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
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
      }),
    });

    const data = await response.json();

    return data;
  }

  async getProduct(productId: string) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.baseURL.sandbox}/v1/catalogs/products/${productId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async capturePayment(body: any) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.baseURL.sandbox}/v2/checkout/orders/${body.resource.id}/capture`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async generateAccessToken() {
    const auth = Buffer.from(this.CLIENT_ID + ':' + this.APP_SECRET).toString(
      'base64',
    );

    const response = await fetch(`${this.baseURL.sandbox}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();

    return data.access_token;
  }
}
