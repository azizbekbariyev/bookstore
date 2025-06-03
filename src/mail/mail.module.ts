import { Module } from '@nestjs/common';
import { EmailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("SMTP_HOST"),
          secure: false,
          auth: {
            user: config.get<string>("SMTP_USER"),
            pass: config.get<string>("SMTP_PASSWORD"),
          },
        },
        defaults:{
          from:`"Book Store" <${config.get<string>("SMTP_HOST")}>`,
        },
        template:{
          dir:join(process.cwd(), 'src/mail/templates'),
          adapter:new HandlebarsAdapter(),
          template:"confirmation",
          options:{
            strict:true
          }
        }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports:[EmailService]
})
export class MailModule {}
