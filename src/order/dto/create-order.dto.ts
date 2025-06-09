import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsDecimal } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        example: 1,
        description: "ID of the supplier",
    })
    @IsInt()
    @IsNotEmpty()
    suppliersId: number;

    @ApiProperty({
        example: 1,
        description: "ID of the book store",
    })
    @IsInt()
    @IsNotEmpty()
    bookStoreId: number;

    @ApiProperty({
        example: 1,
        description: "ID of the book",
    })
    @IsInt()
    @IsNotEmpty()
    bookId: number;

    @ApiProperty({
        example: 1,
        description: "ID of the customer",
    })
    @IsInt()
    @IsNotEmpty()
    customerId: number;

    @ApiProperty({
        example: 1,
        description: "ID of the delivery",
    })
    @IsInt()
    @IsNotEmpty()
    deliveryId: number;

    @ApiProperty({
        example: "TRACK123456",
        description: "Tracking number of the order",
    })
    @IsString()
    @IsNotEmpty()
    tracking_number: string;

    @ApiProperty({
        example: 99.99,
        description: "Total amount of the order",
    })
    @IsDecimal()
    @IsNotEmpty()
    total_amount: string;
}