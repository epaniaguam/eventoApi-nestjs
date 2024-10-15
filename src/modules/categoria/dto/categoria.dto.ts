import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class BaseCategoriaDto {
  @IsOptional()
  @IsString()
  nombreCategoria?: string;
}
export class CreateCategoriaDto extends BaseCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombreCategoria: string;
}

export class UpdateCategoriaDto extends BaseCategoriaDto {
  // Todas las propiedades son opcionales
}
