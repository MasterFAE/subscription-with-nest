import { AddressType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  country;

  @IsNotEmpty()
  @IsString()
  street;

  @IsNotEmpty()
  @IsString()
  city;

  @IsNotEmpty()
  @IsString()
  state;

  @IsNotEmpty()
  @IsString()
  zip;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description;

  @IsNotEmpty()
  @IsIn([AddressType.PRIMARY, AddressType.OTHER])
  type;
}
export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  country;

  @IsOptional()
  @IsString()
  street;

  @IsOptional()
  @IsString()
  city;

  @IsOptional()
  @IsString()
  state;

  @IsOptional()
  @IsString()
  zip;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description;

  @IsOptional()
  @IsIn([AddressType.PRIMARY, AddressType.OTHER])
  type;
}
