import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAddressDto, CreateAddressDto } from './dto/index.dto';
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createAddressDto: CreateAddressDto): Promise<import(".prisma/client").Address>;
    findAll(userId: number): Promise<import(".prisma/client").Address[]>;
    findOne(userId: number, id: number): Promise<import(".prisma/client").Address>;
    update(userId: number, id: number, updateAddressDto: UpdateAddressDto): Promise<import(".prisma/client").Address>;
    remove(userId: any, id: number): Promise<import(".prisma/client").Address>;
}
