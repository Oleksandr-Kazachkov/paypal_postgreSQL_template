import { ApiProperty } from '@nestjs/swagger';

export default class GetOrdersByTimeDto {
  @ApiProperty()
  dateMin: Date;

  @ApiProperty()
  dateMax: Date;
}
