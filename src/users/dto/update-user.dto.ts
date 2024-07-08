import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    enum: Status,
    description: 'The status of the item',
    default: Status.ACTIVE,
  })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
