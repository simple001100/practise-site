import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CompaniesRepository {
  constructor(private prisma: PrismaService) {}

  async createCompany(params: {
    data: Prisma.CompanyCreateInput;
  }): Promise<Company> {
    const { data } = params;
    return this.prisma.company.create({ data });
  }

  async getCompanies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }): Promise<Company[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.company.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateCompany(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.CompanyUpdateInput;
  }): Promise<Company> {
    const { where, data } = params;
    return this.prisma.company.update({ where, data });
  }

  async deleteCompany(params: {
    where: Prisma.CompanyWhereUniqueInput;
  }): Promise<Company> {
    const { where } = params;
    return this.prisma.company.delete({ where });
  }
}
