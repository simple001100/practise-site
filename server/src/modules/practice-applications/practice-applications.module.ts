import { Module } from '@nestjs/common';
import { PracticeApplicationsService } from './practice-applications.service';
import { PrismaModule } from 'src/database/prisma.module';
import { PracticeApplicationsRepository } from './practice-applications.repository';
import { PracticeApplicationsController } from './practice-applications.controller';
import { ApplicationsService } from '../applications/applications.service';
import { CompaniesService } from '../company/companies.service';
import { PracticesService } from '../practices/practices.service';
import { CompaniesRepository } from '../company/companies.repository';
import { PracticesRepository } from '../practices/practices.repository';

@Module({
  controllers: [PracticeApplicationsController],
  imports: [PrismaModule],
  providers: [
    PracticeApplicationsRepository,
    PracticeApplicationsService,
    ApplicationsService,
    CompaniesService,
    PracticesService,
    PracticesRepository,
    CompaniesRepository
  ],
  exports: [PracticeApplicationsService],
})
export class PracticeApplicationsModule {}
