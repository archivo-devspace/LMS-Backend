import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AddTranslationDto, CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req: Request) {
    const userId = req['user'].sub;
    try {
      return await this.postService.create(createPostDto, userId);
    } catch (error) {
      if (error.message.includes('Category with id')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':postId/translation')
  async addTranslation(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() addTranslationDto: AddTranslationDto,
  ) {
    return await this.postService.addTranslation(postId, addTranslationDto);
  }

  // @Get()
  // findAll(@Query('language') language: string) {
  //   return this.postService.findAll(language);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number, @Query('language') language: string) {
  //   return this.postService.findOne(+id, language);
  // }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.postService.remove(+id);
  // }

  // @Get(':id/history')
  // findHistory(@Param('id') id: number) {
  //   return this.postService.findHistory(+id);
  // }
}
