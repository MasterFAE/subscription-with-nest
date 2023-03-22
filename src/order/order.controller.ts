import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { GetCurrentUser } from 'src/common/decorators/current-user.decorator';
import prismaGenerateException from 'src/common/decorators/exception/prisma-exception-generator';
import { CreateOrderDto } from './dto/index.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // There is no payment API connected, so it'll just complete the order payment
  @Post(':id/payment')
  async createPayment(
    @GetCurrentUser('id') userId,
    @Param('id', ParseIntPipe) id,
  ) {
    try {
      return await this.orderService.payForOrder(userId, id);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Get()
  async findAll(@GetCurrentUser('id') userId): Promise<Order[]> {
    try {
      return await this.orderService.findAll(userId);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Get(':id')
  async findOne(
    @GetCurrentUser('id') userId,
    @Param('id', ParseIntPipe) id,
  ): Promise<Order> {
    try {
      // userId is used to check if the order belongs to the user
      return await this.orderService.findOne(userId, id);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Delete(':id')
  async remove(
    @GetCurrentUser('id') userId,
    @Param('id', ParseIntPipe) id,
  ): Promise<Order> {
    try {
      // userId is used to check if the order belongs to the user
      return await this.orderService.remove(userId, id);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }
}
