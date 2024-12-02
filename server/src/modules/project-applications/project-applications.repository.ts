import { Injectable } from '@nestjs/common';
import { Prisma, ProjectApplication } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProjectApplicationsRepository {
  constructor(private prisma: PrismaService) {}

  async createProjectApplication(params: {
    data: Prisma.ProjectApplicationCreateInput;
  }): Promise<ProjectApplication> {
    const { data } = params;
    
    return this.prisma.projectApplication.create({ data });
  }

  async getProjectApplications(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<ProjectApplication[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.projectApplication.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
