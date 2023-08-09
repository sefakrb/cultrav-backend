import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaClient) {}

  async create(
    user: object,
    location_id: number,
    createCommentDto: CreateCommentDto,
  ) {
    let date = new Date();
    let dateStr = date.toISOString().slice(0, 10);
    let dateArr = dateStr.split('-');
    let newDateStr = dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0];

    try {
      const comment = await this.prisma.location_comments.create({
        data: {
          location_id: location_id,
          owner_id: user['user_id'],
          owner_name: user['user_name'],
          comment_context: createCommentDto.comment_context,
          comment_date: newDateStr,
          comment_audio_check: 0,
        },
      });
      return { code: '1', message: 'yorum kaydedildi.' };
    } catch (error) {
      return { code: '0', message: 'eksik bilgi!' };
    }
  }

  async findAll() {
    const comments = await this.prisma.location_comments.findMany();

    return comments;
  }

  async findOne(locationID: number) {
    const comments = await this.prisma.location_comments.findMany({
      where: {
        location_id: locationID,
      },
    });

    return comments;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
