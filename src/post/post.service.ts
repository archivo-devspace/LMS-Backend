import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // async create(createPostDto: CreatePostDto) {
  //   const { translations, categoryId, ...postData } = createPostDto;

  //   // Ensure the category exists
  //   const category = await this.prisma.category.findUnique({
  //     where: { id: categoryId },
  //   });

  //   if (!category) {
  //     throw new Error(`Category with id ${categoryId} does not exist`);
  //   }

  //   const post = await this.prisma.post.create({
  //     data: {
  //       ...postData,
  //       categoryId,
  //       translations: {
  //         create: translations,
  //       },
  //     },
  //   });

  //   await this.createPostHistory(post.id, translations);

  //   return post;
  // }

  async create(createPostDto: CreatePostDto) {
    const { language, title, content, categoryId, authorId } = createPostDto;

    // Ensure the category exists
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error(`Category with id ${categoryId} does not exist`);
    }

    // Create the post and its translation
    const post = await this.prisma.post.create({
      data: {
        categoryId,
        authorId,
        translations: {
          create: {
            language,
            title,
            content,
          },
        },
      },
    });

    // Create post history
    await this.createPostHistory(post.id, language, title, content);

    return post;
  }


  // async findAll(language: string) {
  //   return this.prisma.post.findMany({
  //     include: {
  //       translations: {
  //         where: {
  //           language,
  //         },
  //       },
  //     },
  //   });
  // }

  // async findOne(id: number, language: string) {
  //   return this.prisma.post.findUnique({
  //     where: { id },
  //     include: {
  //       translations: {
  //         where: {
  //           language,
  //         },
  //       },
  //     },
  //   });
  // }

  // async update(id: number, updatePostDto: UpdatePostDto) {
  //   const { translations, categoryId, ...postData } = updatePostDto;

  //   const post = await this.prisma.post.update({
  //     where: { id },
  //     data: {
  //       ...postData,
  //       categoryId,
  //       translations: {
  //         upsert: translations.map(t => ({
  //           where: {
  //             postId_language: {
  //               postId: id,
  //               language: t.language,
  //             },
  //           },
  //           update: t,
  //           create: t,
  //         })),
  //       },
  //     },
  //   });

  //   await this.createPostHistory(post.id, translations);

  //   return post;
  // }

  // async remove(id: number) {
  //   const post = await this.prisma.post.delete({
  //     where: { id },
  //   });

  //   await this.createPostHistory(post.id);

  //   return post;
  // }

  // private async createPostHistory(postId: number, translations?) {
  //   const post = await this.prisma.post.findUnique({
  //     where: { id: postId },
  //     include: { translations: true },
  //   });

  //   await this.prisma.postHistory.create({
  //     data: {
  //       postId: post.id,
  //       categoryId: post.categoryId,
  //       authorId: post.authorId,
  //       translations: {
  //         create: translations ? translations.map(t => ({
  //           language: t.language,
  //           title: t.title,
  //           content: t.content,
  //         })) : post.translations.map(t => ({
  //           language: t.language,
  //           title: t.title,
  //           content: t.content,
  //         })),
  //       },
  //     },
  //   });
  // }

  private async createPostHistory(postId: number, language: string, title: string, content: string) {
    await this.prisma.postHistory.create({
      data: {
        postId,
        categoryId: (await this.prisma.post.findUnique({ where: { id: postId } })).categoryId,
        authorId: (await this.prisma.post.findUnique({ where: { id: postId } })).authorId,
        translations: {
          create: {
            language,
            title,
            content,
          },
        },
      },
    });
  }

  // async findHistory(postId: number) {
  //   return this.prisma.postHistory.findMany({
  //     where: { postId },
  //     include: { translations: true },
  //     orderBy: { createdAt: 'desc' },
  //   });
  // }
}
