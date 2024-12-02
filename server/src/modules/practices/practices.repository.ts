import { Injectable } from '@nestjs/common';
import { Practice, Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PracticesRepository {
  constructor(private prisma: PrismaService) {}

  async createPractice(params: {
    data: Prisma.PracticeCreateInput;
  }): Promise<Practice> {
    const { data } = params;
    return this.prisma.practice.create({ data });
  }

  async getPractices(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PracticeWhereUniqueInput;
    where?: Prisma.PracticeWhereInput;
    orderBy?: Prisma.PracticeOrderByWithRelationInput;
  }): Promise<Practice[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.practice.findMany({ skip, take, cursor, where, orderBy });
  }

  async updatePractice(params: {
    where: Prisma.PracticeWhereUniqueInput;
    data: Prisma.PracticeUpdateInput;
  }): Promise<Practice> {
    const { where, data } = params;
    return this.prisma.practice.update({ where, data });
  }

  async deletePractice(params: {
    where: Prisma.PracticeWhereUniqueInput;
  }): Promise<Practice> {
    const { where } = params;
    return this.prisma.practice.delete({ where });
  }
}
