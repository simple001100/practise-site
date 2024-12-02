import { Injectable } from '@nestjs/common';
import { PracticeApplication, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PracticeApplicationsRepository {
  constructor(private prisma: PrismaService) {}

  async createPracticeApplication(params: {
    data: Prisma.PracticeApplicationCreateInput;
  }): Promise<PracticeApplication> {
    const { data } = params;
    
    return this.prisma.practiceApplication.create({ data });
  }

  async getPracticeApplications(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PracticeWhereUniqueInput;
    where?: Prisma.PracticeWhereInput;
    orderBy?: Prisma.PracticeOrderByWithRelationInput;
  }): Promise<PracticeApplication[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.practiceApplication.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
