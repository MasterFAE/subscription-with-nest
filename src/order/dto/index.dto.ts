import { OrderStatus } from '@prisma/client';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  orderTotal;

  @IsNotEmpty()
  @IsNumber()
  addressId;

  @IsNotEmpty()
  @IsNumber()
  subscriptionId;
}
