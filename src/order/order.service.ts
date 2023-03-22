import { Injectable } from '@nestjs/common';
import { OrderStatus, SubscriptionStatus } from '@prisma/client';
import { SUBSCRIPTION_DURATION } from 'src/common/decorators/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/index.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        address: { connect: { id: createOrderDto.addressId } },
        orderItem: { connect: { id: createOrderDto.subscriptionId } },
        user: { connect: { id: userId } },
        orderTotal: createOrderDto.orderTotal,
      },
    });
  }

  async payForOrder(userId: number, id: number) {
    return await this.prisma.order.update({
      where: {
        userId_id: { userId, id },
      },
      data: {
        status: OrderStatus.COMPLETED,
        orderItem: {
          update: {
            status: SubscriptionStatus.ACTIVE,
            nextRenewal: new Date(
              Date.now() + SUBSCRIPTION_DURATION * 24 * 60 * 60 * 1000,
            ),
            lastRenewal: new Date(Date.now()),
          },
        },
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.order.findMany({ where: { userId } });
  }

  async findOne(userId: number, id: number) {
    return await this.prisma.order.findFirst({ where: { userId, id } });
  }

  async remove(userId: number, id: number) {
    return await this.prisma.order.update({
      where: { userId_id_status: { userId, id, status: OrderStatus.PENDING } },
      data: {
        status: OrderStatus.CANCELLED,
        orderItem: { update: { status: SubscriptionStatus.CANCELLED } },
      },
    });
  }
}
