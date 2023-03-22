import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators/current-user.decorator';
import prismaGenerateException from 'src/common/decorators/exception/prisma-exception-generator';
import { UpdateSubscriptionDto } from './dto/index.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async create(@GetCurrentUser('id') userId) {
    try {
      return await this.subscriptionService.create(userId);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Get(':id')
  async findOne(@GetCurrentUser('id') userId, @Param('id', ParseIntPipe) id) {
    try {
      return await this.subscriptionService.find(userId, id);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @GetCurrentUser('id') userId,
    @Param('id', ParseIntPipe) id,
    @Body() { status }: UpdateSubscriptionDto,
  ) {
    try {
      return await this.subscriptionService.updateStatus(userId, id, status);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }
}
