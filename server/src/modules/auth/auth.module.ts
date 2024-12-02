import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthRepository } from './auth.repository';
import { CompaniesService } from '../company/companies.service';
import { ConfigModule } from '@nestjs/config';
import { CompaniesRepository } from '../company/companies.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AtStrategy, RtStrategy, AuthService, CompaniesService, CompaniesRepository],
  imports: [
    PrismaModule,
    JwtModule.register({}),
  ],
  exports: [AuthService],
})
export class AuthModule {}
