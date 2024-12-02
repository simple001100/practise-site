import { Module } from '@nestjs/common';
import { ProjectApplicationsService } from './project-applications.service';
import { ProjectApplicationsController } from './project-applications.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { ProjectApplicationsRepository } from './project-applications.repository';
import { ApplicationsService } from '../applications/applications.service';
import { CompaniesService } from '../company/companies.service';
import { CompaniesRepository } from '../company/companies.repository';

@Module({
  controllers: [ProjectApplicationsController],
  imports: [PrismaModule],
  providers: [
    ProjectApplicationsRepository,
    ProjectApplicationsService,
    ApplicationsService,
    CompaniesService,
    CompaniesRepository,
  ],
  exports: [ProjectApplicationsService],
})
export class ProjectApplicationsModule {}
