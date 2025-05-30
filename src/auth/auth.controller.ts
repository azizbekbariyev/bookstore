import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CreateWorkerDto } from '../worker/dto/create-worker.dto';
import { Request, Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("customer/activate/:link")
  async activateStaff(@Param("link") link: string) {
    return this.authService.activateCustomer(link);
  }

  @Get("refresh-token-customer")
  async refreshTokenCustomer(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenCustomer(req, res);
  }  

  @Post('sign-up-customer')
  async signUpdCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.authService.signUpCustomer(createCustomerDto);
  }

  @Post('sign-in-customer')
  async signInCustomer(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInCustomer(signInDto, res);
  }

  @Post('sign-out-customer')
  async signOutCustomer(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ){
    return this.authService.signOutCustomer(req, res);
  }

  @Get("worker/activate/:link")
  async activateWorker(@Param("link") link: string) {
    return this.authService.activateWorker(link);
  }

  @Get("refresh-token-worker")
  async refreshTokenWorker(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenWorker(req, res);
  }

  @Post('sign-up-worker')
  async signUpWorker(
    @Body() createWorkerDto: CreateWorkerDto,
  ) {
    return this.authService.signUpWorker(createWorkerDto);
  }

  @Post('sign-in-worker')
  async signInWorker(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInWorker(signInDto, res);
  }

  @Post('sign-out-worker')
  async signOutWorker(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ){
    return this.authService.signOutWorker(req, res);
  }
}
