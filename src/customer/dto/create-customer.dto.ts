import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsEmail, IsBoolean, IsOptional } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({
        example: "John",
        description: "First name of the customer",
    })
    @IsString()
    first_name: string;

    @ApiProperty({
        example: "Doe",
        description: "Last name of the customer",
    })
    @IsString()
    last_name: string;

    @ApiProperty({
        example: "john.doe@example.com",
        description: "Email address of the customer",
    })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({
        example: "+998901234567",
        description: "Phone number of the customer",
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({
        example: 1,
        description: "ID of the address associated with the customer",
    })
    @IsOptional()
    address_id?: number;

    @ApiProperty({
        example: true,
        description: "Indicates if the customer account is active",
    })
    @IsBoolean()
    is_active: boolean;

    @ApiProperty({
        example: "$2b$10$...hashed_password...",
        description: "Hashed password of the customer",
    })
    @IsString()
    hashed_password: string;

    @ApiProperty({
        example: "$2b$10$...hashed_refresh_token...",
        description: "Hashed refresh token of the customer",
    })
    @IsString()
    hashed_refresh_token?: string
}