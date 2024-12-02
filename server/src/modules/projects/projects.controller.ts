import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from 'src/common/decorators';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/getAll')
  getAll() {
    return this.projectsService.getProjects();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/getOne/:id')
  getById(@Param('id') id: number) {
    return this.projectsService.getOneProject(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update')
  update(@Body() projectDto: UpdateProjectDto) {
    return this.projectsService.changeProject(projectDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() projectDto: CreateProjectDto) {
    return this.projectsService.createProjects(projectDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/remove/:id')
  remove(@Param('id') id: number) {
    return this.projectsService.removeProject(id);
  }
}
