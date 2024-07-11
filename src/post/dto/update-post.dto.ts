import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  authorId?: number;

  @ApiProperty()
  @IsArray()
  translations: UpdatePostTranslationDto[];
}

export class UpdatePostTranslationDto {
  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;
}
