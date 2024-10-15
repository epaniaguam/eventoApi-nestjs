import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateClienteDto } from "src/dto/cliente.dto";
import { CreateEventoDto } from "src/dto/evento.dto";
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
}

export class UpdateVentaDto extends PartialType(RegistrarVentaDto) {}


