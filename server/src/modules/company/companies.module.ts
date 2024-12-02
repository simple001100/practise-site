import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { CompaniesService } from './companies.service';
import { CompaniesRepository } from './companies.repository';

@Module({
    controllers: [],
    imports: [PrismaModule],
    providers: [CompaniesRepository, CompaniesService],
    exports: [CompaniesService],
  })
export class CompaniesModule {}
