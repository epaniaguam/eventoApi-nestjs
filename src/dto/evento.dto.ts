import { PartialType } from "@nestjs/mapped-types";
import { Transform, Type } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseCategoriaDto, CreateCategoriaDto, UpdateCategoriaDto } from "src/modules/categoria/dto/categoria.dto";
import { ApiProperty } from '@nestjs/swagger';

export class BaseEventoDto {
  @ApiProperty({ description: 'Nombre del evento', required: false })
  @IsOptional()
  @IsString()
  nombreEvento?: string;

  @ApiProperty({ description: 'Descripción del evento', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Fecha del evento', required: false })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  fecha?: Date;

  @ApiProperty({ description: 'Lugar del evento', required: false })
  @IsOptional()
  @IsString()
  lugar?: string;

  @ApiProperty({ description: 'Categoría del evento', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => BaseCategoriaDto)
  categoria?: BaseCategoriaDto;
}

export class CreateEventoDto extends BaseEventoDto {
  @ApiProperty({ description: 'Nombre del evento.' })
  @IsString()
  @IsNotEmpty()
  nombreEvento: string;

  @ApiProperty({ description: 'Descripción del evento', required: false })
  @IsOptional()
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'Fecha del evento.' })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fecha: Date;

  @ApiProperty({ description: 'Lugar del evento.' })
  @IsString()
  @IsNotEmpty()
  lugar: string;

  @ApiProperty({ description: 'Categoría del evento.' })
  @ValidateNested()
  @Type(() => CreateCategoriaDto)
  @IsNotEmpty()
  categoria: CreateCategoriaDto;
}

export class UpdateEventoDto extends BaseEventoDto {
  // Todas las propiedades son opcionales
}