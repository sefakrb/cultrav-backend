import { PrismaClient } from '@prisma/client';
import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    const locations = await this.prisma.location_info.findMany();
    return locations;
  }

  async findLocationByCity(city) {
    const cityLocations = await this.prisma.location_info.findMany({
      where: {
        location_city: city,
      },
    });

    return cityLocations;
  }
}
