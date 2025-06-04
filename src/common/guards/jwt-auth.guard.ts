import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException({ message: "Token topilmadi" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = this.jwtService.decode(token) as any;
    const role = decoded?.role?.[0];
    if (!role) {
      throw new UnauthorizedException({ message: "Role aniqlanmadi" });
    }

    const secret = this.getSecretByRole(role);

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret });
      req["user"] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: "Token yaroqsiz", error });
    }
  }

  private getSecretByRole(role: string): string {
    switch (role) {
      case "customer":
        return process.env.CUSTOMER_ACCESS_TOKEN_KEY!;
      default:
        return process.env.WORKER_ACCESS_TOKEN_KEY!;
    }
  }
}
