import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { AddressType, OrderStatus, SubscriptionStatus } from '@prisma/client';
import {
  IMPOSSIBLE_ACTION,
  NO_MATCH,
  SERVER_ERROR,
  SUBSCRIPTION_DURATION,
  SUBSCRIPTION_PRICE,
} from 'src/common/decorators/constants';
import { QueryException } from 'src/common/decorators/exception/query.exception';
import { OrderService } from 'src/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private prisma: PrismaService,
    private orderService: OrderService,
  ) {}

  private logger = new Logger(SubscriptionService.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async checkSubscriptionDate() {
    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        status: SubscriptionStatus.ACTIVE,
        nextRenewal: { lte: new Date() },
      },
      include: {
        user: {
          select: {
            address: {
              select: {
                id: true,
                type: true,
              },
            },
          },
        },
      },
    });

    for (const subscription of subscriptions) {
      // Check the primary address
      let address =
        subscription.user.address.find((e) => e.type == AddressType.PRIMARY) ||
        subscription.user.address[0];

      // If there is no address, cancel the subscription
      if (!address) {
        await this.prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: SubscriptionStatus.CANCELLED,
          },
        });
        continue;
      }

      this.logger.log(
        'Renewing subscription for user: ' + subscription.userId + '',
      );

      // Create a new order and update the subscription status to waiting for payment
      const [,] = await Promise.all([
        this.prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: SubscriptionStatus.WAITING_FOR_PAYMENT,
          },
        }),
        this.orderService.create(subscription.userId, {
          addressId: address.id,
          orderTotal: subscription.price,
          subscriptionId: subscription.id,
        }),
      ]).catch((e) => {
        this.logger.error('An error occured while renewing a subscription');
        this.logger.error(e);
        return [null, null];
      });
    }
  }

  async create(userId) {
    // Check if user already has a subscription
    const [subscription, address] = await Promise.all([
      this.prisma.subscription.findUnique({
        where: { userId },
      }),
      this.prisma.address.findMany({
        where: { userId },
      }),
    ]);

    if (!address)
      throw new QueryException({
        message: NO_MATCH,
        description: 'No address found for this user',
        code: 404,
      });

    let userAddress =
      address.find((e) => e.type == AddressType.PRIMARY) || address[0];

    let newSubscription;

    // Use case 1- New subscription
    if (!subscription) {
      newSubscription = await this.prisma.subscription.create({
        data: {
          user: { connect: { id: userId } },
          price: SUBSCRIPTION_PRICE,
          status: SubscriptionStatus.WAITING_FOR_PAYMENT,
          nextRenewal: new Date(
            Date.now() + SUBSCRIPTION_DURATION * 24 * 60 * 60 * 1000,
          ),
        },
      });
    }

    // If user already has a active subscription
    else if (subscription.status == SubscriptionStatus.ACTIVE) {
      throw new QueryException({
        message: IMPOSSIBLE_ACTION,
        description: 'User already has an active subscription',
        code: 400,
      });
    }
    // If user already has a pending order
    else if (subscription.status == SubscriptionStatus.WAITING_FOR_PAYMENT) {
      throw new QueryException({
        message: IMPOSSIBLE_ACTION,
        description: 'User already has a pending subscription',
        code: 400,
      });
    }
    // Use case 2- Renew subscription
    else {
      newSubscription = await this.prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          price: SUBSCRIPTION_PRICE,
          status: SubscriptionStatus.WAITING_FOR_PAYMENT,
          nextRenewal: new Date(
            Date.now() + SUBSCRIPTION_DURATION * 24 * 60 * 60 * 1000,
          ),
        },
      });
    }

    try {
      // Create the order
      const order = await this.orderService.create(userId, {
        orderTotal: newSubscription.price,
        addressId: userAddress.id,
        subscriptionId: newSubscription.id,
      });
      return { order, newSubscription };
    } catch (error) {
      throw new QueryException({
        message: SERVER_ERROR,
        description: 'Error while creating order',
        code: 500,
      });
    }
  }

  async find(userId, id) {
    return await this.prisma.subscription.findFirst({
      where: { userId, id },
    });
  }

  async updateStatus(userId: number, id: number, status: SubscriptionStatus) {
    return await this.prisma.subscription.update({
      where: { userId_id: { userId, id } },
      data: { status },
    });
  }
}
