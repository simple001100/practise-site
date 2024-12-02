import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentCompany,
  GetCurrentCompanyId,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { SigninCompanyDto } from './dto/signin-company.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() companyDto: CreateCompanyDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { tokens, ...data } = await this.authService.signup(companyDto);

    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true });

    return data;
  }

  @Public()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() companyDto: SigninCompanyDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { tokens, ...data } = await this.authService.signin(companyDto);

    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true });

    return data;
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentCompanyId() userId: number, @Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken');
    response.clearCookie('accessToken');

    await this.authService.logout(userId)
    return userId;
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentCompanyId() companyId: number,
    @GetCurrentCompany('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { tokens, ...data } = await this.authService.refreshTokens(
      companyId,
      refreshToken,
    );

    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true });

    return data;
  }
}
