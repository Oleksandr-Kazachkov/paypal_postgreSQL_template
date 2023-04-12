import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ProductEntity } from 'src/components/products/entity/product.entity';

@Injectable()
export class PaypalService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async capturePaypalOrder(body: any) {
    const captureData = await this.capturePayment(body);

    return captureData;
  }

  async getProduct(productId: string): Promise<ProductEntity> {
    const baseURL = this.configService.get('SANDBOX');
    const accessToken = await this.generateAccessToken();
    const url = `${baseURL}/v1/catalogs/products/${productId}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    const data = response.data;

    return data;
  }

  async capturePayment(body: any) {
    const baseURL = this.configService.get('SANDBOX');
    const accessToken = await this.generateAccessToken();
    const url = `${baseURL}/v2/checkout/orders/${body.resource.id}/capture`;
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
    const CLIENT_ID = this.configService.get('CLIENT_ID');
    const APP_SECRET = this.configService.get('APP_SECRET');
    const baseURL = this.configService.get('SANDBOX');
    const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64');

    const response = await fetch(`${baseURL}/v1/oauth2/token`, {
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
