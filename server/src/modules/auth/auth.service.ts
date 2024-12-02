import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { TokensType } from './types';
import { CompaniesService } from '../company/companies.service';
import { AuthRepository } from './auth.repository';
import { Token } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { SigninCompanyDto } from './dto/signin-company.dto';

@Injectable()
export class AuthService {
  constructor(
    private companyService: CompaniesService,
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async signup(companyDto: CreateCompanyDto) {
    const { email } = companyDto;

    const condidate = await this.companyService.getOneCompany({ email });

    if (condidate)
      throw new HttpException(
        'Company is already exists!',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = await this.hashData(companyDto.password);

    const newCompany = await this.companyService.createCompany({
      ...companyDto,
      address: '',
      password: hashPassword,
    });

    const tokens = await this.getTokens(newCompany.id, newCompany.email, '');
    await this.saveToken({
      companyId: newCompany.id,
      refreshToken: tokens.refreshToken,
    });

    const { password: _, ...data } = newCompany;

    return { ...data, tokens };
  }

  async signin(companyDto: SigninCompanyDto) {
    const { email, password } = companyDto;

    const company = await this.companyService.getOneCompany({ email });
    if (!company)
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);

    const passwordMatches = await bcrypt.compare(password, company.password);
    if (!passwordMatches)
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);

    const tokens = await this.getTokens(
      company.id,
      company.email,
      company.role,
    );

    const token = await this.findTokenBy({ companyId: company.id });

    await this.updateToken({
      companyId: company.id,
      refreshToken: tokens.refreshToken,
    });

    const { password: _, ...data } = company;

    return { ...data, tokens };
  }

  async logout(companyId: number) {
    await this.updateToken({ companyId, refreshToken: '' });
  }

  async refreshTokens(id: number, rt: string) {
    const company = await this.companyService.getOneCompany({ id });

    const companyToken = await this.findTokenBy({ companyId: id });

    if (!companyToken || !companyToken.refreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, companyToken.refreshToken);
    console.log(rtMatches + '\n' + rt + '\n' + companyToken.refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(id, company.email, company.role);
    await this.updateToken({
      refreshToken: tokens.refreshToken,
      companyId: id,
    });

    const { password: _, ...data } = company;

    return { ...data, tokens };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    companyId: number,
    email: string,
    role: string,
  ): Promise<TokensType> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: companyId,
          email,
          role,
        },
        {
          secret: process.env.SECRET_OR_KEY_ACCESS,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: companyId,
          email,
          role,
        },
        {
          secret: process.env.SECRET_OR_KEY_REFRESH,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  async saveToken(params: {
    refreshToken: Token[`refreshToken`];
    companyId: Token['companyId'];
  }) {
    const { refreshToken, companyId } = params;

    const project = await this.authRepository.createToken({
      data: {
        refreshToken,
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });

    return project;
  }

  async findTokenBy(params: { [key: string]: any }) {
    const projects = await this.authRepository.getTokens({ where: params });

    return projects[0];
  }

  async updateToken(params: {
    refreshToken: Token[`refreshToken`];
    companyId: Token['companyId'];
  }) {
    try {
      const { refreshToken, companyId } = params;

      const hash = refreshToken ? await this.hashData(refreshToken) : undefined;

      const token = await this.findTokenBy({ companyId });

      if (!token)
        await this.authRepository.createToken({
          data: {
            company: {
              connect: {
                id: companyId,
              },
            },
            refreshToken: hash || '',
          },
        });

      await this.authRepository.updateToken({
        where: { id: token.id },
        data: {
          refreshToken: hash,
        },
      });
    } catch (err: any) {
      console.error(err);
      throw new ForbiddenException('Access Denied');
    }
  }
}
