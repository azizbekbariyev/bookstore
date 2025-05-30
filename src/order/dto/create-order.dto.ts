import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsDecimal } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        example: 1,
        description: "ID of the supplier",
    })
    @IsInt()
    @IsNotEmpty()
    suppliers_id: number;

    @ApiProperty({
        example: 1,
        description: "ID of the book store",
    })
    @IsInt()
    @IsNotEmpty()
    book_store_id: number;

    @ApiProperty({
        example: 1,
        description: "ID of the book",
    })
    @IsInt()
    @IsNotEmpty()
    book_id: number;

    @ApiProperty({
        example: 1,
        description: "ID of the customer",
    })
    @IsInt()
    @IsNotEmpty()
    customer_id: number;

    @ApiProperty({
        example: 1,
        description: "ID of the delivery",
    })
    @IsInt()
    @IsNotEmpty()
    delivery_id: number;

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
    total_amount: number;
}