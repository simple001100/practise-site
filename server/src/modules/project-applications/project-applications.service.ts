import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectApplication } from '@prisma/client';
import { ProjectApplicationsRepository } from './project-applications.repository';
import { ApplicationsService } from '../applications/applications.service';
import { CompaniesService } from '../company/companies.service';
import { projectApplicationCreater } from 'src/templates/project-application';

@Injectable()
export class ProjectApplicationsService {
  constructor(
    private repository: ProjectApplicationsRepository,
    private applicationsService: ApplicationsService,
    private companyService: CompaniesService,
  ) {}

  async createProjectApplication(params: {
    companyId: ProjectApplication[`companyId`];
    name: ProjectApplication[`name`];
    description: ProjectApplication[`description`];
    endDate: ProjectApplication[`endDate`];
  }) {
    const { name, description, endDate, companyId } = params;

    const company = await this.companyService.getOneCompany({ id: companyId });

    if (!company) throw new BadRequestException('Invalid company!');

    const { name: companyName, responsiblePerson, email, phone } = company;

    const projectApplication = await this.repository.createProjectApplication({
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
        name,
        description,
        endDate: new Date(endDate),
      },
    });
    

    await this.applicationsService.sendEmail({
      email: process.env.EMAIL || '',
      html: projectApplicationCreater({
        number: projectApplication.id,
        name,
        description,
        endDate,
        companyName,
        responsiblePerson,
        email,
        phone,
      }),
      cause: 'Заявка на проект',
    });

    return projectApplication;
  }

  async getProjectApplications() {
    const practiceApplications = await this.repository.getProjectApplications(
      {},
    );

    return practiceApplications;
  }
}
