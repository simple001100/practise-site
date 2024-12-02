import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.yandex.by',
        port: 587,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
  ],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
