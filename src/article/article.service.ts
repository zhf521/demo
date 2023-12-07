import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId,
      },
    });
  }

  async findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const articles = await this.prisma.article.findMany({
      skip,
      take: pageSize,
    });
    return {
      data: articles,
      page: page,
      pageSize: pageSize,
      total: this.prisma.article.count(),
    };
  }

  findOne(id: number) {
    return this.prisma.article.findFirst({
      where: { id },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: +updateArticleDto.categoryId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
