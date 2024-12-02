import { BadRequestException, Injectable } from '@nestjs/common';
import { PracticeApplication } from '@prisma/client';
import { PracticeApplicationsRepository } from './practice-applications.repository';
import { ApplicationsService } from '../applications/applications.service';
import { CompaniesService } from '../company/companies.service';
import { PracticesService } from '../practices/practices.service';
import { practiceApplicationCreater } from 'src/templates/practice-application';

@Injectable()
export class PracticeApplicationsService {
  constructor(
    private repository: PracticeApplicationsRepository,
    private applicationsService: ApplicationsService,
    private companiesService: CompaniesService,
    private practiceService: PracticesService,
  ) {}

  async createPracticeApplication(params: {
    companyId: PracticeApplication[`companyId`];
    practiceId: PracticeApplication[`practiceId`];
    count: PracticeApplication['count'];
  }) {
    const { companyId, practiceId, count } = params;

    const company = await this.companiesService.getOneCompany({
      id: companyId,
    });
    const practice = await this.practiceService.getOnePractice({
      id: practiceId,
    });

    if (!company || !practice)
      throw new BadRequestException('Invalid company or practice!');

    const { name: companyName, responsiblePerson, email, phone } = company;
    const { startDate, endDate, variant } = practice;

    const practiceApplication = await this.repository.createPracticeApplication(
      {
        data: {
          count,
          company: {
            connect: {
              id: companyId,
            },
          },
          practice: {
            connect: {
              id: practiceId,
            },
          },
        },
      },
    );

    await this.applicationsService.sendEmail({
      email: process.env.EMAIL || '',
      html: practiceApplicationCreater({
        number: practiceApplication.id,
        startDate: startDate.toLocaleDateString("uk-Uk"),
        variant,
        endDate: endDate.toLocaleDateString("uk-Uk"),
        companyName,
        responsiblePerson,
        email,
        phone,
        count,
      }),
      cause: practice.variant,
    });

    return practiceApplication;
  }

  async getPracticeApplications() {
    const practiceApplications = await this.repository.getPracticeApplications(
      {},
    );

    return practiceApplications;
  }
}
