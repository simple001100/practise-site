import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectApplicationsService } from './project-applications.service';
import { CreateProjectApplicationDto } from './dto/create-project-application.dto';
import { Public } from 'src/common/decorators';

@Controller('project-applications')
export class ProjectApplicationsController {
  constructor(private projectApplicationsService: ProjectApplicationsService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/getAll')
  getAll() {
    return this.projectApplicationsService.getProjectApplications();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() projectApllication: CreateProjectApplicationDto) {
    return this.projectApplicationsService.createProjectApplication(
      projectApllication,
    );
  }
}
