import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { CustomerModule } from "../customer/customer.module";
import { MailModule } from "../mail/mail.module";
import { WorkerModule } from "../worker/worker.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.SECRET_TIME },
    }),
    CustomerModule,
    MailModule,
    WorkerModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
