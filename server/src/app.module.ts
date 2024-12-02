import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { PracticesModule } from './modules/practices/practices.module';
import { PracticeApplicationsModule } from './modules/practice-applications/practice-applications.module';
import { ProjectApplicationsModule } from './modules/project-applications/project-applications.module';
import { CompaniesModule } from './modules/company/companies.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { AtGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { DistributionModule } from './modules/distribution/distribution.module';

@Module({
  imports: [
    ProjectsModule,
    PracticesModule,
    PracticeApplicationsModule,
    ProjectApplicationsModule,
    CompaniesModule,
    ApplicationsModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DistributionModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
