import { PartialType } from "@nestjs/mapped-types";
import { Transform, Type } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateCategoriaDto } from "src/modules/categoria/dto/categoria.dto";

export class CreateEventoDto {

  @IsString()
  @IsNotEmpty()
  nombreEvento: string;

  @IsString()
  @IsOptional()
  descripcion: string;
  
  @Transform(({ value }) => new Date(value))  // Transforma el string en una instancia de Date
  @IsDate()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  lugar: string;

  @ValidateNested()
  @Type(() => CreateCategoriaDto)
  @IsNotEmpty()
  categoria: CreateCategoriaDto;
  
  // @IsString()
  // @IsNotEmpty()
  // categoria: string;

}

export class UpdateEventoDto extends PartialType(CreateEventoDto) {}