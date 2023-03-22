import { SubscriptionStatus } from '@prisma/client';
import { OrderService } from 'src/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubscriptionService {
    private prisma;
    private orderService;
    constructor(prisma: PrismaService, orderService: OrderService);
    private logger;
    checkSubscriptionDate(): Promise<void>;
    create(userId: any): Promise<{
        order: import(".prisma/client").Order;
        newSubscription: any;
    }>;
    find(userId: any, id: any): Promise<import(".prisma/client").Subscription>;
    updateStatus(userId: number, id: number, status: SubscriptionStatus): Promise<import(".prisma/client").Subscription>;
}
