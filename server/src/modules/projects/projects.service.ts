import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private repository: ProjectsRepository) {}

  async createProjects(params: {
    name: Project[`name`];
    photo: Project[`photo`];
    description: Project[`description`];
    link: Project[`link`];
  }) {
    const { name, photo, description, link } = params;

    const project = await this.repository.createProject({
      data: {
        name,
        photo,
        description,
        link,
      },
    });

    return project;
  }

  async getProjects() {
    const projects = await this.repository.getProjects({});

    return projects;
  }

  async removeProject(id: number) {
    const project = await this.repository.deleteProject({ where: { id } });

    return project;
  }

  async getOneProject(id: number) {
    const practice = await this.repository.getProjects({ where: { id } });

    return practice;
  }

  async changeProject(params: {
    id: number;
    name: Project[`name`];
    photo: Project[`photo`];
    description: Project[`description`];
  }) {
    const { id, name, photo, description } = params;

    const practice = await this.repository.updateProject({
      where: { id },
      data: {
        name,
        photo,
        description,
      },
    });

    return practice;
  }
}
