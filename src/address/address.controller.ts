import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { Address } from '@prisma/client';
import { GetCurrentUser } from 'src/common/decorators/current-user.decorator';
import prismaGenerateException from 'src/common/decorators/exception/prisma-exception-generator';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/index.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(
    @GetCurrentUser('id') userId,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    try {
      return await this.addressService.create(userId, createAddressDto);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Get()
  async findAll(@GetCurrentUser('id') userId): Promise<Address[]> {
    try {
      return await this.addressService.findAll(userId);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Get(':id')
  async findOne(
    @GetCurrentUser('id') userId,
    @Param('id', ParseIntPipe) id,
  ): Promise<Address> {
    try {
      // We pass the userId to the service to make sure the user is the owner of the address
      return await this.addressService.findOne(userId, id);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Patch(':id')
  async update(
    @GetCurrentUser('id') userId,
    @Param('id', ParseIntPipe) id,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    try {
      // We pass the userId to the service to make sure the user is the owner of the address
      return await this.addressService.update(userId, id, updateAddressDto);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }

  @Delete(':id')
  remove(
    @GetCurrentUser('id') userId,
    @Param('id', ParseIntPipe) id,
  ): Promise<Address> {
    try {
      // We pass the userId to the service to make sure the user is the owner of the address
      return this.addressService.remove(userId, id);
    } catch (error) {
      // Basic error handling
      let { code, message } = prismaGenerateException(error);
      throw new HttpException(message, code);
    }
  }
}
