import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';
import { LocationService } from './location.service';

@Module({
  providers: [LocationService, PrismaClient],
  exports: [LocationService],
})
export class LocationModule {}
