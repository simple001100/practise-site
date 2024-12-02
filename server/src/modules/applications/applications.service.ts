import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MessageType } from './type/email.types';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class ApplicationsService {
  constructor(private mailService: MailerService) {}

  async sendEmail({ email, html, cause, text }: MessageType) {
    try {
      await this.mailService.sendMail({
        from: email,
        to: process.env.EMAIL,
        subject: cause,
        html,
      });
    } catch (err: any) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
