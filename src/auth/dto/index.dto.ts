import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'First name is too short' })
  @MaxLength(20, { message: 'First name is too long' })
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'Last name is too short' })
  @MaxLength(20, { message: 'Last name is too long' })
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(64, { message: 'Password is too long' })
  @IsString()
  password: string;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email;

  @IsNotEmpty()
  @IsString()
  password;
}
