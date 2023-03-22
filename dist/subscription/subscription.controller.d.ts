import { UpdateSubscriptionDto } from './dto/index.dto';
import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(userId: any): Promise<{
        order: import(".prisma/client").Order;
        newSubscription: any;
    }>;
    findOne(userId: any, id: any): Promise<import(".prisma/client").Subscription>;
    updateStatus(userId: any, id: any, { status }: UpdateSubscriptionDto): Promise<import(".prisma/client").Subscription>;
}
