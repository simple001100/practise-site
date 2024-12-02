import { Body, Controller, Get, Patch, Post, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { AtGuard } from 'src/common/guards';
import { Public } from 'src/common/decorators';

@Controller('practices')
export class PracticesController {
  constructor(private practicesService: PracticesService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/getAll')
  getAll() {
    return this.practicesService.getPractices();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/getOne/:id')
  getById(@Param('id') id: number) {
    return this.practicesService.getOnePractice({id});
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update')
  update(@Body() practiceDto: UpdatePracticeDto) {
    return this.practicesService.changePractice(practiceDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  create(@Body() practiceDto: CreatePracticeDto) {
    return this.practicesService.createPractice(practiceDto);
  }
}
