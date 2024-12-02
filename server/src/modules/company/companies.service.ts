import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private repository: CompaniesRepository) {}

  async createCompany(params: {
    name: Company[`name`];
    responsiblePerson: Company[`responsiblePerson`];
    phone: Company[`phone`];
    email: Company[`email`];
    address: Company[`address`];
    password: Company[`password`];
  }) {
    const { name, responsiblePerson, phone, email, address, password } = params;

    const company = await this.repository.createCompany({
      data: {
        name,
        responsiblePerson,
        phone,
        email,
        address,
        password,
        role: '',
      },
    });

    return company;
  }

  async changeCompany(params: {
    id: number;
    name: Company[`name`];
    responsiblePerson: Company[`responsiblePerson`];
    phone: Company[`phone`];
    email: Company[`email`];
    address: Company[`address`];
    password: Company[`password`];
  }) {
    const { id, responsiblePerson, phone, email, address, password } = params;

    const company = await this.repository.updateCompany({
      where: { id },
      data: {
        responsiblePerson,
        phone,
        email,
        address,
        password,
      },
    });

    return company;
  }

  async getCompanies() {
    const company = await this.repository.getCompanies({});

    return company;
  }

  async getOneCompany(params: { [key: string]: any }) {
    const company = await this.repository.getCompanies({ where: params });

    return company[0];
  }

  async removeCompany(id: number) {
    const company = await this.repository.deleteCompany({ where: { id } });

    return company;
  }
}
