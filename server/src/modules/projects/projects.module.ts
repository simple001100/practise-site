import { Module } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  imports: [PrismaModule],
  providers: [ProjectsRepository, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
