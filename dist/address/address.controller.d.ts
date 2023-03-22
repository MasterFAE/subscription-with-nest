import { Address } from '@prisma/client';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/index.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(userId: any, createAddressDto: CreateAddressDto): Promise<Address>;
    findAll(userId: any): Promise<Address[]>;
    findOne(userId: any, id: any): Promise<Address>;
    update(userId: any, id: any, updateAddressDto: UpdateAddressDto): Promise<Address>;
    remove(userId: any, id: any): Promise<Address>;
}
