import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class BaseCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría', required: false })
  @IsOptional()
  @IsString()
  nombreCategoria?: string;
}

export class CreateCategoriaDto extends BaseCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría, debe ser un texto no vacío.' })
  @IsString()
  @IsNotEmpty()
  nombreCategoria: string;
}

export class UpdateCategoriaDto extends BaseCategoriaDto {
  // Todas las propiedades son opcionales
}