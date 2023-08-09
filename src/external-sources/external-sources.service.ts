import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateExternalSourceDto } from './dto/create-external-source.dto';
import { UpdateExternalSourceDto } from './dto/update-external-source.dto';

@Injectable()
export class ExternalSourcesService {
  constructor(private prisma: PrismaClient) {}

  create(createExternalSourceDto: CreateExternalSourceDto) {
    return 'This action adds a new externalSource';
  }

  findAll() {
    return `This action returns all externalSources`;
  }

  async findOne(city: string) {
    const externalHotels = await this.prisma.gyg_klook_content.findMany({
      where: {
        city: city,
        type: 'Hotel',
      },
    });

    const externalActivities = await this.prisma.gyg_klook_content.findMany({
      where: {
        city: city,
        type: 'Activity',
      },
    });

    const externalTours = await this.prisma.gyg_klook_content.findMany({
      where: {
        city: city,
        type: 'Tour',
      },
    });

    let externalsAll = {
      hotels: externalHotels,
      activitiesAndTours: externalActivities.concat(externalTours),
    };

    return externalsAll;
  }

  update(id: number, updateExternalSourceDto: UpdateExternalSourceDto) {
    return `This action updates a #${id} externalSource`;
  }

  remove(id: number) {
    return `This action removes a #${id} externalSource`;
  }
}
