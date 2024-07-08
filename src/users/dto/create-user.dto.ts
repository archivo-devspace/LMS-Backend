import { ApiProperty } from '@nestjs/swagger';
import { Role, Status } from '@prisma/client';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(8, { message: 'Confirm password must be at least 8 characters' })
  confirmPassword: string;

  @ApiProperty({
    enum: Role,
    description: 'The role of the user',
    default: Role.NORMAL_USER,
  })
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  
}

export class LoginUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password: string;
}

export class CheckUserEmailDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

