import { Injectable } from '@nestjs/common';
import { DistributionRepository } from './distribution.repository';
import { ApplicationsService } from '../applications/applications.service';
import { distributionApplicationCreater } from 'src/templates/distribution-application';

@Injectable()
export class DistributionService {
  constructor(
    private repository: DistributionRepository,
    private applicationService: ApplicationsService,
  ) {}

  async distribute() {
    const emails = await this.repository.getEmails({});

    await Promise.all(
      emails.map(async ({ email }) => {
        await this.applicationService.sendEmail({
          email,
          html: distributionApplicationCreater(),
          cause: 'Рассылка',
        });
      }),
    );

    return 'ok';
  }

  async getEmails() {
    return this.repository.getEmails({});
  }

  async addEmail(email: string) {
    return this.repository.addEmail({ data: { email } });
  }

  async removeEmail(id: number) {
    return this.repository.removeEmail({ data: { where: { id } } });
  }
}
