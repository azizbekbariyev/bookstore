import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsString, IsNumber, Min, Max, IsBoolean, IsOptional } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({
        example: 1,
        description: "ID of the book associated with the review",
    })
    @IsInt()
    book_id: number;

    @ApiProperty({
        example: 1,
        description: "ID of the customer who wrote the review",
    })
    @IsInt()
    customer_id: number;

    @ApiProperty({
        example: 4,
        description: "Rating given by the customer (1-5)",
    })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({
        example: "Great book, highly recommend!",
        description: "Text content of the review",
    })
    @IsString()
    review_text: string;

    @ApiPropertyOptional({
        example: true,
        description: "Indicates if the review is from a verified purchase",
    })
    @IsOptional()
    @IsBoolean()
    verified_purchase?: boolean;
}