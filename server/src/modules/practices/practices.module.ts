import { Module } from '@nestjs/common';
import { PracticesRepository } from './practices.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { PracticesController } from './practices.controller';
import { PracticesService } from './practices.service';

@Module({
  controllers: [PracticesController],
  imports: [PrismaModule],
  providers: [PracticesRepository, PracticesService],
  exports: [PracticesService],
})
export class PracticesModule {}
