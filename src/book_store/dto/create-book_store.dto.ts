import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsEmail, IsInt, IsOptional } from "class-validator";

export class CreateBookStoreDto {
    @ApiProperty({
        example: "store@example.com",
        description: "Email address of the book store",
    })
    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Phone number of the book store",
    })
    @IsString()
    phone_number: string;

    @ApiProperty({
        example: "9:00 AM - 6:00 PM",
        description: "Operating hours of the book store",
    })
    @IsString()
    operating_hours: string;

    @ApiPropertyOptional({
        example: 1,
        description: "ID of the worker associated with the book store",
    })
    @IsOptional()
    @IsInt()
    worker_id?: number;

    @ApiProperty({
        example: 1,
        description: "ID of the address associated with the book store",
    })
    @IsInt()
    addressId: number;

    @ApiPropertyOptional({
        example: 1,
        description: "ID of the book associated with the book store",
    })
    @IsOptional()
    @IsInt()
    book_id?: number;

    @ApiProperty({
        example: "Central Book Store",
        description: "Name of the book store",
    })
    @IsString()
    name: string;
}