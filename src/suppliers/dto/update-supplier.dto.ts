import { PartialType } from '@nestjs/swagger';
import { CreateSuppliersDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSuppliersDto) {}
