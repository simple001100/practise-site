import { Injectable } from '@nestjs/common';
import { PracticesRepository } from './practices.repository';
import { Practice } from '@prisma/client';

@Injectable()
export class PracticesService {
  constructor(private repository: PracticesRepository) {}

  async createPractice(params: {
    variant: Practice[`variant`];
    startDate: Practice[`startDate`];
    endDate: Practice[`endDate`];
  }) {
    const { variant, startDate, endDate } = params;

    const practice = await this.repository.createPractice({
      data: {
        variant,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return practice;
  }

  async changePractice(params: {
    id: number;
    variant: Practice[`variant`];
    startDate: Practice[`startDate`];
    endDate: Practice[`endDate`];
  }) {
    const { id, variant, startDate, endDate } = params;

    const practice = await this.repository.updatePractice({
      where: { id },
      data: {
        variant,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return practice;
  }

  async getPractices() {
    const practice = await this.repository.getPractices({});

    return practice;
  }

  async getOnePractice(params: { [key: string]: any }) {
    const practice = await this.repository.getPractices({ where: params });

    return practice[0];
  }

  async removePractice(id: number) {
    const practice = await this.repository.deletePractice({ where: { id } });

    return practice;
  }
}
