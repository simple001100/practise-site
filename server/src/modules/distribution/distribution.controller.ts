import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DistributionService } from './distribution.service';
import { AddEmailDto } from './dto/add-email.dto';
import { AdminAuthGuard } from 'src/common/guards/admin.guard';
import { AtStrategy } from '../auth/strategies';

@Controller('admin/distribution')
export class DistributionController {
  constructor(private distributionService: DistributionService) {}

  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/make')
  getAll() {
    return this.distributionService.distribute();
  }

  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Get('/getAll')
  getEmails() {
    return this.distributionService.getEmails();
  }

  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/add')
  addEmail(@Body() body: AddEmailDto) {
    const { email } = body;
    return this.distributionService.addEmail(email);
  }

  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Delete('/remove/:id')
  removeEmail(@Param('id') id: number) {
    return this.distributionService.removeEmail(Number(id));
  }
}
