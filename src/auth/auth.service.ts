import {
  BadRequestException,
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomerService } from "../customer/customer.service";
import { WorkerService } from "../worker/worker.service";
import { Worker } from "../worker/entities/worker.entity";
import { CreateWorkerDto } from "../worker/dto/create-worker.dto";
import { EmailService } from "../mail/mail.service";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Customer } from "../customer/entities/customer.entity";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
    private readonly workerService: WorkerService,
    private readonly mailService: EmailService
  ) {}

  async generateTokenWorker(worker: Worker) {
    const payload = {
      id: worker.id,
      email: worker.email,
      hashed_password: worker.hashed_password,
      is_active: worker.is_active,
      role: worker.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.WORKER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.STAFF_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.WORKER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.STAFF_REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async activateWorker(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateWorker = await this.workerService.findByLink(link);
    if (!updateWorker) {
      throw new BadRequestException("Activation link not found database");
    }

    updateWorker.is_active = true;

    await this.workerService.update(updateWorker.id, updateWorker);
    return {
      message: "Worker activates successfully",
      is_active: updateWorker.is_active,
    };
  }

  async refreshTokenWorker(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.WORKER_REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const worker = await this.workerService.findOne(payload.id);

    if (!worker || !worker.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      worker.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken } =
      await this.generateTokenWorker(worker);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);
    await this.workerService.update(worker.id, {
      hashed_refresh_token: hashed_refresh_token,
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: accessToken,
    };
  }

  async signUpWorker(createWorkerDto: CreateWorkerDto) {
    const worker = await this.workerService.findByEmail(createWorkerDto.email);
    if (worker) {
      throw new ConflictException("Worker already exists");
    }
    const newWorker = await this.workerService.create(createWorkerDto);
    try {
      await this.mailService.sendMailWorker(newWorker);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        "Emailga xat yuborishda xatolik Pochtani tekshiring"
      );
    }
  }

  async signInWorker(signInDto: SignInDto, res: Response) {
    const worker = await this.workerService.findByEmail(signInDto.email);
    if (!worker) {
      throw new UnauthorizedException("Email yoki password noto'g'ri1");
    }
    const validPassword = await bcrypt.compare(
      signInDto.hashed_password,
      worker.hashed_password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Email yoki password noto'g'ri2");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenWorker(worker);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const refresh_Token = await bcrypt.hash(refreshToken, 10);
    await this.workerService.update(worker.id, {
      hashed_refresh_token: refresh_Token,
    });
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  async signOutWorker(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let workerId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.WORKER_REFRESH_TOKEN_KEY,
      });
      workerId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const worker = await this.workerService.findOne(workerId);
    if (!worker) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    const hashed_refresh_token = "";
    await this.workerService.update(worker.id, { hashed_refresh_token });
    res.clearCookie("refresh_token");
    return { message: "Logout successfully" };
  }

  async generateTokenCustomer(customer: Customer) {
    const payload = {
      id: customer.id,
      email: customer.email,
      hashed_password: customer.hashed_password,
      is_active: customer.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.CUSTOMER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.CUSTOMER_REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async activateCustomer(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateCustomer = await this.customerService.findByLink(link);
    if (!updateCustomer) {
      throw new BadRequestException("Activation link not found database");
    }

    updateCustomer.is_active = true;

    await this.customerService.update(updateCustomer.id, updateCustomer);
    return {
      message: "Customer activates successfully",
      is_active: updateCustomer.is_active,
    };
  }

  async refreshTokenCustomer(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const customer = await this.customerService.findOne(payload.id);

    if (!customer || !customer.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      customer.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken } =
      await this.generateTokenCustomer(customer);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);
    await this.customerService.update(customer.id, {
      hashed_refresh_token: hashed_refresh_token,
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: accessToken,
    };
  }

  async signUpCustomer(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.findByEmail(
      createCustomerDto.email
    );
    if (Customer) {
      throw new ConflictException("Customer already exists");
    }
    const newCustomer = await this.customerService.create(createCustomerDto);
    try {
      await this.mailService.sendMailCustomer(newCustomer);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        "Emailga xat yuborishda xatolik Pochtani tekshiring"
      );
    }
  }

  async signInCustomer(signInDto: SignInDto, res: Response) {
    const customer = await this.customerService.findByEmail(signInDto.email);
    if (!customer) {
      throw new UnauthorizedException("Email yoki password noto'g'ri1");
    }
    const validPassword = await bcrypt.compare(
      signInDto.hashed_password,
      customer.hashed_password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Email yoki password noto'g'ri2");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenCustomer(customer);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const refresh_Token = await bcrypt.hash(refreshToken, 10);
    await this.customerService.update(customer.id, {
      hashed_refresh_token: refresh_Token,
    });
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  async signOutCustomer(req:Request, res:Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let customerId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
      });
      customerId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    const hashed_refresh_token = "";
    await this.customerService.update(customer.id, { hashed_refresh_token });
    res.clearCookie("refresh_token");
    return { message: "Logout successfully" };
  }
}
