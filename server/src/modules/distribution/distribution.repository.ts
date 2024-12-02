import { Injectable } from '@nestjs/common';
import { Emails, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DistributionRepository {
  constructor(private prisma: PrismaService) {}

  async getEmails(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmailsWhereUniqueInput;
    where?: Prisma.EmailsWhereInput;
    orderBy?: Prisma.EmailsOrderByWithRelationInput;
  }): Promise<Emails[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.emails.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async addEmail(params: { data: Prisma.EmailsCreateInput }): Promise<Emails> {
    const { data } = params;

    return this.prisma.emails.create({ data });
  }

  async removeEmail(params: { data: Prisma.EmailsDeleteArgs }): Promise<Emails> {
    const { data } = params;

    return this.prisma.emails.delete(data);
  }
}
