import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsDateString, IsEnum, IsNotEmpty } from "class-validator";

export class CreateDeliveryDto {
    @ApiProperty({
        example: 1,
        description: "ID of the supplier",
    })
    @IsInt()
    @IsNotEmpty()
    suppliers_id: number;

    @ApiProperty({
        example: "123 Delivery St",
        description: "Delivery address",
    })
    @IsString()
    @IsNotEmpty()
    delivery_address: string;

    @ApiProperty({
        example: "456 Received St",
        description: "Received address",
    })
    @IsString()
    @IsNotEmpty()
    received_address: string;

    @ApiProperty({
        example: "2025-05-29",
        description: "Date the delivery was received",
    })
    @IsDateString()
    @IsNotEmpty()
    delivered_date: string;

    @ApiProperty({
        example: "completed",
        description: "Status of the delivery",
    })
    @IsEnum(["pending", "in_transit", "completed"])
    @IsNotEmpty()
    status: string;
}