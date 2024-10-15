import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ description: 'Nombre del cliente.' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Edad del cliente.', required: false })
  @IsNumber()
  @IsOptional()
  edad: number;
}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}