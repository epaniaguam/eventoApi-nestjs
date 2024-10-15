import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { CreateClienteDto, UpdateClienteDto } from "src/dto/cliente.dto";
import { CreateEventoDto, UpdateEventoDto } from "src/dto/evento.dto";
import { ReferenciarUsuarioDto } from "src/modules/usuario/dto/usuario.dto";
import { PartialType } from '@nestjs/mapped-types';


export class RegistrarVentaDto {
  @ValidateNested()
  @Type(() => ReferenciarUsuarioDto)
  @IsNotEmpty()
  usuario: ReferenciarUsuarioDto;

  @ValidateNested()
  @Type(() => CreateClienteDto)
  @IsNotEmpty()
  cliente: CreateClienteDto;

  @ValidateNested()
  @Type(() => CreateEventoDto)
  @IsNotEmpty()
  evento: CreateEventoDto;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio: number;
}

export class UpdateVentaDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ReferenciarUsuarioDto)
  usuario?: ReferenciarUsuarioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateClienteDto)
  cliente?: UpdateClienteDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEventoDto)
  evento?: UpdateEventoDto;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio?: number;
}