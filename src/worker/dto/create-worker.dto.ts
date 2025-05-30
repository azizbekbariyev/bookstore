import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsEnum, IsNotEmpty, IsDateString } from "class-validator";

export class CreateWorkerDto {
    @ApiProperty({
        example: "John",
        description: "First name of the worker",
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        example: "Doe",
        description: "Last name of the worker",
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        example: "john.doe@example.com",
        description: "Email address of the worker",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "password123",
        description: "Password of the worker (to be hashed)",
    })
    @IsString()
    @IsNotEmpty()
    hashed_password: string;

    @ApiProperty({
        example: "employee",
        description: "Role of the worker",
    })
    @IsEnum(["admin", "employee", "manager"])
    @IsNotEmpty()
    role: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Phone number of the worker",
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: "2023-01-15",
        description: "Hire date of the worker",
    })
    @IsDateString()
    @IsNotEmpty()
    hire_date: string;

    @ApiProperty({
        example:"refresh_token",
        description:"Refresh token of the worker"
    })
    @IsString()
    hashed_refresh_token?: string
}