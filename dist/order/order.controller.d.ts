import { Order } from '@prisma/client';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createPayment(userId: any, id: any): Promise<Order>;
    findAll(userId: any): Promise<Order[]>;
    findOne(userId: any, id: any): Promise<Order>;
    remove(userId: any, id: any): Promise<Order>;
}
