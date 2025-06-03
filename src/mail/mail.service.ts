import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Customer } from "../customer/entities/customer.entity";
import { Worker } from "../worker/entities/worker.entity";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailCustomer(customer: Customer) {
    const url = `${process.env.API_HOST}/api/auth/customer/activate/${customer.activation_link}`;

    console.log(url);
    await this.mailerService.sendMail({
      to: customer.email,
      subject: "Welcome to BookStore !",
      template: "confirmation",
      context: {
        name: customer.first_name,
        url,
      },
    });
  }

  async sendMailWorker(worker: Worker) {
    const url = `${process.env.API_HOST}/api/auth/worker/activate/${worker.activation_link}`;

    console.log(url);
    await this.mailerService.sendMail({
      to: worker.email,
      subject: "Welcome to BookStore !",
      template: "confirmation",
      context: {
        name: worker.first_name,
        url,
      },
    });
  }

}
