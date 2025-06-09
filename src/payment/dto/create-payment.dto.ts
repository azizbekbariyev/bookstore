import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsString, IsDateString, IsInt, IsBoolean, IsNotEmpty } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty({
        example: 99.99,
        description: "Amount of the payment",
    })
    @IsDecimal()
    @IsNotEmpty()
    amount: string;

    @ApiProperty({
        example: "Credit Card",
        description: "Payment method used",
    })
    @IsString()
    @IsNotEmpty()
    payment_method: string;

    @ApiProperty({
        example: "2025-05-29",
        description: "Date of the payment",
    })
    @IsDateString()
    @IsNotEmpty()
    payment_date: string;

    @ApiProperty({
        example: 1,
        description: "ID of the order",
    })
    @IsInt()
    @IsNotEmpty()
    orderId: number;

    @ApiProperty({
        example: true,
        description: "Status of the payment",
    })
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}