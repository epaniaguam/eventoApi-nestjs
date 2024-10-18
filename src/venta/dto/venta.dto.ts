import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";


export class BaseVentaDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsString()
  clienteId?: string;

  @IsOptional()
  @IsString()
  eventoId?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  fechaVenta? : Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio?: number;
}


export class CreateVentaDto {
  @IsOptional()
  @IsString()
  usuarioId: string;

  @IsOptional()
  @IsString()
  clienteId: string;

  @IsOptional()
  @IsString()
  eventoId: string;

  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  fechaVenta? : Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio: number;
}

export class UpdateVentaDto extends BaseVentaDto {
} 