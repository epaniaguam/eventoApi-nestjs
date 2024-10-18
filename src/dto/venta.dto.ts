import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { CreateClienteDto, UpdateClienteDto } from "src/dto/cliente.dto";
import { CreateEventoDto, UpdateEventoDto } from "src/dto/evento.dto";
import { ReferenciarUsuarioDto } from "src/modules/usuario/dto/usuario.dto";
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CrearteVentaDto {
  @ApiProperty({ description: 'Datos del usuario que realiza la venta' })
  @ValidateNested()
  @Type(() => ReferenciarUsuarioDto)
  @IsNotEmpty()
  usuario: ReferenciarUsuarioDto;

  @ApiProperty({ description: 'Datos del cliente asociado a la venta' })
  @ValidateNested()
  @Type(() => CreateClienteDto)
  @IsNotEmpty()
  cliente: CreateClienteDto;

  @ApiProperty({ description: 'Datos del evento asociado a la venta' })
  @ValidateNested()
  @Type(() => CreateEventoDto)
  @IsNotEmpty()
  evento: CreateEventoDto;

  @ApiProperty({ description: 'Precio de la venta, debe ser un número positivo' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio: number;
}

export class UpdateVentaDto {
  @ApiProperty({ description: 'Datos del usuario que realiza la venta', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ReferenciarUsuarioDto)
  usuario?: ReferenciarUsuarioDto;

  @ApiProperty({ description: 'Datos del cliente asociado a la venta', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateClienteDto)
  cliente?: UpdateClienteDto;

  @ApiProperty({ description: 'Datos del evento asociado a la venta', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEventoDto)
  evento?: UpdateEventoDto;

  @ApiProperty({ description: 'Precio de la venta, debe ser un número positivo', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio?: number;
}