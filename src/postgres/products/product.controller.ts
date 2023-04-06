import { Body, Controller, Post } from '@nestjs/common';
import CreateProductDto from './dto/create.product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/createProduct')
  async createOrder(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }
}
