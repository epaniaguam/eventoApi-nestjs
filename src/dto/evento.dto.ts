import { PartialType } from "@nestjs/mapped-types";
import { Transform, Type } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseCategoriaDto, CreateCategoriaDto, UpdateCategoriaDto } from "src/modules/categoria/dto/categoria.dto";

export class BaseEventoDto {
  @IsOptional()
  @IsString()
  nombreEvento?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  fecha?: Date;

  @IsOptional()
  @IsString()
  lugar?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => BaseCategoriaDto)
  categoria?: BaseCategoriaDto;
}

export class CreateEventoDto extends BaseEventoDto {
  @IsString()
  @IsNotEmpty()
  nombreEvento: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  lugar: string;

  @ValidateNested()
  @Type(() => CreateCategoriaDto)
  @IsNotEmpty()
  categoria: CreateCategoriaDto;
}

export class UpdateEventoDto extends BaseEventoDto {
  // Todas las propiedades son opcionales
}