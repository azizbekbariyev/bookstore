import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateSuppliersDto {
    
    @ApiProperty({
        example: "Book Supplier Inc.",
        description: "Name of the supplier",
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "John Smith",
        description: "Contact person of the supplier",
    })
    @IsString()
    @IsNotEmpty()
    contact_person: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Phone number of the supplier",
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: "supplier@example.com",
        description: "Email of the supplier",
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "123 Supplier St",
        description: "Address of the supplier",
    })
    @IsString()
    @IsNotEmpty()
    address: string;
}