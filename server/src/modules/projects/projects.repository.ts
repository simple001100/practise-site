import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async createProject(params: {
    data: Prisma.ProjectCreateInput;
  }): Promise<Project> {
    const { data } = params;
    return this.prisma.project.create({ data });
  }

  async getProjects(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.project.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { where, data } = params;
    return this.prisma.project.update({ where, data });
  }

  async deleteProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
  }): Promise<Project> {
    const { where } = params;
    return this.prisma.project.delete({ where });
  }
}
