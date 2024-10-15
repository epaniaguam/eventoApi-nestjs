import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import exp from 'constants';
import { BaseEventoDto } from 'src/dto/evento.dto';

export class BasePublicacionDto {
  @IsOptional()
  @IsString()
  tituloPublicacion? : string;

  @IsOptional()
  @IsString()
  lugarPublicacion? : string;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  fechaPublicacion? : Date;

  @IsOptional()
  @IsString()
  eventoNombre? : string;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => BaseEventoDto)
  // evendo?: BaseEventoDto
}

export class CreatePublicacionDto extends BasePublicacionDto {
  @IsString()
  @IsNotEmpty()
  tituloPublicacion: string;

  @IsString()
  @IsNotEmpty()
  lugarPublicacion: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fechaPublicacion: Date;

  @IsString()
  @IsNotEmpty()
  eventoNombre: string;

  // @ValidateNested()
  // @Type(() => BaseEventoDto)
  // @IsNotEmpty()
  // evento: BaseEventoDto;

}

export class UpdatePublicacionDto extends BasePublicacionDto {
  // Todas las propiedades son opcionales
}