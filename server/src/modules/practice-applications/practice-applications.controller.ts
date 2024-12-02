import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PracticeApplicationsService } from './practice-applications.service';
import { CreatePracticeApplicationDto } from './dto/create-practice-application.dto';
import { Public } from 'src/common/decorators';

@Controller('practice-applications')
export class PracticeApplicationsController {
  constructor(
    private practiceApplicationsService: PracticeApplicationsService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/getAll')
  getAll() {
    return this.practiceApplicationsService.getPracticeApplications();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() practiceApllication: CreatePracticeApplicationDto) {
    return this.practiceApplicationsService.createPracticeApplication(
      practiceApllication,
    );
  }
}
