import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';
import { ExternalSourcesService } from './external-sources.service';
import { ExternalSourcesController } from './external-sources.controller';

@Module({
  controllers: [ExternalSourcesController],
  providers: [ExternalSourcesService, PrismaClient],
})
export class ExternalSourcesModule {}
