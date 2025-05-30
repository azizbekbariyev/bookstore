import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
    @ApiProperty({
        example: "Tashkent",
        description: "Name of the city",
    })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({
        example: "Tashkent Region",
        description: "Name of the state or region",
    })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiPropertyOptional({
        example: "Hospital entrance",
        description: "Specific target or landmark near the address",
    })
    @IsOptional()
    @IsString()
    target?: string;

    @ApiPropertyOptional({
        example: "Amir Temur street",
        description: "Name of the street",
    })
    @IsOptional()
    @IsString()
    street?: string;

    @ApiPropertyOptional({
        example: "12B",
        description: "House or building number",
    })
    @IsOptional()
    @IsString()
    number?: string;
}
