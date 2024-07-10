// import { ApiProperty } from "@nestjs/swagger";
// import { IsArray, IsInt, IsString } from "class-validator";

// export class CreatePostDto {
//     @ApiProperty()
//     @IsInt()
//     categoryId: number;

//     @ApiProperty()
//     @IsInt()
//     authorId: number;

//     @ApiProperty()
//     @IsArray()
//     translations : CreatePostTranslationDto[] ;
// }


// export class CreatePostTranslationDto {
//     @ApiProperty()
//     @IsString()
//     language: string;

//     @ApiProperty()
//     @IsString()
//     title: string;

//     @ApiProperty()
//     @IsString()
//     content: string;

// }

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsInt()
  categoryId: number;

  @ApiProperty()
  @IsInt()
  authorId: number;

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