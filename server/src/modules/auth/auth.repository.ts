import { Injectable } from '@nestjs/common';
import { Prisma, Token } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createToken(params: {
    data: Prisma.TokenCreateInput;
  }): Promise<Token> {
    const { data } = params;
    return this.prisma.token.create({ data });
  }

  async getTokens(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TokenWhereUniqueInput;
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput;
  }): Promise<Token[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.token.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateToken(params: {
    where: Prisma.TokenWhereUniqueInput;
    data: Prisma.TokenUpdateInput;
  }): Promise<Token> {
    const { where, data } = params;
    return this.prisma.token.update({ where, data });
  }

  async deleteToken(params: {
    where: Prisma.TokenWhereUniqueInput;
  }): Promise<Token> {
    const { where } = params;
    return this.prisma.token.delete({ where });
  }
}
