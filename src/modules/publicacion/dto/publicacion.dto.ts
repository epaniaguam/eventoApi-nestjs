import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BasePublicacionDto {
  @ApiProperty({ description: 'Título de la publicación', required: false })
  @IsOptional()
  @IsString()
  tituloPublicacion? : string;

  @ApiProperty({ description: 'Lugar de la publicación', required: false })
  @IsOptional()
  @IsString()
  lugarPublicacion? : string;

  @ApiProperty({ description: 'Fecha de la publicación', required: false })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  fechaPublicacion? : Date;

  @ApiProperty({ description: 'Nombre del evento asociado a la publicación', required: false })
  @IsOptional()
  @IsString()
  eventoNombre? : string;
}

export class CreatePublicacionDto extends BasePublicacionDto {
  @ApiProperty({ description: 'Título de la publicación' })
  @IsString()
  @IsNotEmpty()
  tituloPublicacion: string;

  @ApiProperty({ description: 'Lugar de la publicación' })
  @IsString()
  @IsNotEmpty()
  lugarPublicacion: string;

  @ApiProperty({ description: 'Fecha de la publicación' })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fechaPublicacion: Date;

  @ApiProperty({ description: 'Nombre del evento asociado a la publicación' })
  @IsString()
  @IsNotEmpty()
  eventoNombre: string;
}

export class UpdatePublicacionDto extends BasePublicacionDto {
  // Todas las propiedades son opcionales
}