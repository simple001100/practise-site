import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { ApplicationsService } from '../applications/applications.service';
import { DistributionService } from './distribution.service';
import { DistributionRepository } from './distribution.repository';
import { DistributionController } from './distribution.controller';

@Module({
  controllers:[DistributionController],
  imports: [PrismaModule],
  providers: [
    ApplicationsService,
    DistributionService,
    DistributionRepository
  ],
  exports: [DistributionService],
})
export class DistributionModule {}
