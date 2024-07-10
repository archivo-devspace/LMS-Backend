import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { parentId, ...categoryData } = createCategoryDto;

    // Ensure the parent category exists if parentId is provided
    if (parentId) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: parentId },
      });

      if (!parentCategory) {
        throw new NotFoundException(
          `Parent category with id ${parentId} does not exist`,
        );
      }
    }

    return this.prisma.category.create({
      data: {
        ...categoryData,
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        children: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { parentId, ...categoryData } = updateCategoryDto;

    // Ensure the parent category exists if parentId is provided and not null
    if (parentId !== undefined && parentId !== null) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: parentId },
      });

      if (!parentCategory) {
        throw new NotFoundException(
          `Parent category with id ${parentId} does not exist`,
        );
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...categoryData,
        parentId: parentId === null ? null : parentId ? parentId : undefined,
      },
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.delete({
      where: { id },
    });

    return category;
  }
}
