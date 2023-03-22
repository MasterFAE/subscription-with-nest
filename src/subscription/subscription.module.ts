import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderService } from 'src/order/order.service';

@Module({
  controllers: [SubscriptionController],
  imports: [PrismaModule],
  providers: [SubscriptionService, OrderService],
})
export class SubscriptionModule {}
