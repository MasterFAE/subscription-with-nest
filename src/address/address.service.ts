import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAddressDto, CreateAddressDto } from './dto/index.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createAddressDto: CreateAddressDto) {
    return await this.prisma.address.create({
      data: { ...createAddressDto, user: { connect: { id: userId } } },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.address.findMany({ where: { userId } });
  }

  async findOne(userId: number, id: number) {
    return await this.prisma.address.findFirst({ where: { id, userId } });
  }

  async update(userId: number, id: number, updateAddressDto: UpdateAddressDto) {
    const { city, zip, country, description, state, street, type } =
      updateAddressDto;
    return await this.prisma.address.update({
      where: { userId_id: { userId, id } },
      data: {
        city: city || undefined,
        zip: zip || undefined,
        country: country || undefined,
        description: description || undefined,
        state: state || undefined,
        street: street || undefined,
        type: type || undefined,
      },
    });
  }

  async remove(userId, id: number) {
    return await this.prisma.address.delete({
      where: { userId_id: { userId, id } },
    });
  }
}
