import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CreateWorkerDto } from '../worker/dto/create-worker.dto';
import { Request, Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("customer/activate/:link")
  @ApiOperation({ summary: "Customer hisobini faollashtirish (activation link orqali)" })
  async activateStaff(@Param("link") link: string) {
    return this.authService.activateCustomer(link);
  }

  @Get("refresh-token-customer")
  @ApiOperation({ summary: "Customer uchun refresh token olish" })
  async refreshTokenCustomer(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenCustomer(req, res);
  }  

  @Post('sign-up-customer')
  @ApiOperation({ summary: "Yangi customer ro‘yxatdan o‘tishi (sign up)" })
  async signUpdCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.authService.signUpCustomer(createCustomerDto);
  }

  @Post('sign-in-customer')
  @ApiOperation({ summary: "Customer tizimga kirishi (sign in)" })
  async signInCustomer(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInCustomer(signInDto, res);
  }

  @Post('sign-out-customer')
  @ApiOperation({ summary: "Customer tizimdan chiqishi (sign out)" })
  async signOutCustomer(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ){
    return this.authService.signOutCustomer(req, res);
  }

  @Get("worker/activate/:link")
  @ApiOperation({ summary: "Worker hisobini faollashtirish (activation link orqali)" })
  async activateWorker(@Param("link") link: string) {
    return this.authService.activateWorker(link);
  }

  @Get("refresh-token-worker")
  @ApiOperation({ summary: "Worker uchun refresh token olish" })
  async refreshTokenWorker(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenWorker(req, res);
  }

  @Post('sign-up-worker')
  @ApiOperation({ summary: "Yangi worker ro‘yxatdan o‘tishi (sign up)" })
  async signUpWorker(
    @Body() createWorkerDto: CreateWorkerDto,
  ) {
    return this.authService.signUpWorker(createWorkerDto);
  }

  @Post('sign-in-worker')
  @ApiOperation({ summary: "Worker tizimga kirishi (sign in)" })
  async signInWorker(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInWorker(signInDto, res);
  }

  @Post('sign-out-worker')
  @ApiOperation({ summary: "Worker tizimdan chiqishi (sign out)" })
  async signOutWorker(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ){
    return this.authService.signOutWorker(req, res);
  }
}