import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceService } from 'src/postgres/invoices/invoice.service';
import { OrderService } from 'src/postgres/order/order.service';
import { UserService } from 'src/postgres/user/user.service';
import { PaypalService } from './paypal/paypal.service';
import CreateOrderDto from './postgres/order/dto/create.order.dto';
import { Order } from './postgres/order/entity/order.entity';
import CreateProductDto from './postgres/products/dto/create.product.dto';
import PostCommetDto from './postgres/products/dto/post.comment.dto';
import PostGradeDto from './postgres/products/dto/post.grade.dto';
import PostLikeDto from './postgres/products/dto/post.like.dto';
import { Product } from './postgres/products/entity/product.entity';
import { ProductService } from './postgres/products/product.service';
import AddToFavouriteDto from './postgres/user/dto/add.favourite.dto';

@Controller()
export class AppController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly orderService: OrderService,
    private readonly invoiceService: InvoiceService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Post('/createOrder')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findOne(createOrderDto.user_paypal_id);

    await this.orderService.createOrder({
      user: user,
      user_paypal_id: createOrderDto.user_paypal_id,
      status: 'PENDING',
      product_id: createOrderDto.product_id,
    });

    const product = await this.productService.findOne(
      createOrderDto.product_id,
    );

    createOrderDto.product = product;

    return await this.paypalService.createOrder(createOrderDto);
  }

  @Post('/createProduct')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @Post('/getProduct')
  async getProduct(@Body('productId') productId: string): Promise<Product> {
    return await this.paypalService.getProduct(productId);
  }

  @Post('/capturePayment')
  async capturePayment(@Body() body: any) {
    const response = await this.paypalService.capturePayment(body);

    console.log(response);

    if (response.payer.payer_id) {
      const order = await this.orderService.findOneOrderByUserId(
        response.payer.payer_id,
      );

      await this.orderService.updateOrderStatus(order, response.status);

      await this.invoiceService.createInvoice({
        data: response,
        order: order,
      });
    }

    return body;
  }

  @Post('/capturePaypalPayment')
  async capturePaypalPayment(@Body() body: any) {
    console.log(body);
    return await this.paypalService.capturePaypalOrder(body.id);
  }

  @Post('/post-like')
  async postLike(@Body() postLikeDto: PostLikeDto) {
    const user = await this.userService.findOne(postLikeDto.user_id);
    postLikeDto.user = user;
    return await this.productService.postLike(postLikeDto);
  }

  @Post('/add-to-favourites')
  async addToFavourites(@Body() addToFavouritesDto: AddToFavouriteDto) {
    const product = await this.productService.findOne(
      addToFavouritesDto.productId,
    );

    addToFavouritesDto.product = product;

    return await this.userService.addToFavouritres(addToFavouritesDto);
  }

  @Post('/post-comment')
  async postComment(@Body() postCommetDto: PostCommetDto) {
    const user = await this.userService.findOne(postCommetDto.user_id);
    postCommetDto.user = user;
    return await this.productService.postComment(postCommetDto);
  }

  @Post('/post-grade')
  async postGrade(@Body() postGradeDto: PostGradeDto) {
    const user = await this.userService.findOne(postGradeDto.user_id);
    postGradeDto.user = user;
    return await this.productService.postGrade(postGradeDto);
  }
}
