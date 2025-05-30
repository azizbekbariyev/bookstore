import { PartialType } from "@nestjs/swagger";
import { CreateAuthorDto } from "./create-author.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @ApiProperty({ example: "John", description: "Author's first name" })
  @IsString()
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Author's last name" })
  @IsString()
  last_name: string;

  @ApiPropertyOptional({
    example: "Famous writer of thrillers.",
    description: "Author's biography",
  })
  @IsString()
  biography?: string;

  @ApiPropertyOptional({
    example: "1975-10-01",
    description: "Author's birth date",
  })
  @IsOptional()
  birth_date?: string;

  @ApiPropertyOptional({
    example: "British",
    description: "Author's nationality",
  })
  @IsString()
  nationality?: string;
}
