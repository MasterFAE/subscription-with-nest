import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/index.dto';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createOrderDto: CreateOrderDto): Promise<import(".prisma/client").Order>;
    payForOrder(userId: number, id: number): Promise<import(".prisma/client").Order>;
    findAll(userId: number): Promise<import(".prisma/client").Order[]>;
    findOne(userId: number, id: number): Promise<import(".prisma/client").Order>;
    remove(userId: number, id: number): Promise<import(".prisma/client").Order>;
}
