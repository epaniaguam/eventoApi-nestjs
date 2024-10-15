import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre del usuario, debe tener entre 3 y 50 caracteres.' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({ description: 'Nombre de usuario, debe tener entre 3 y 50 caracteres.' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @ApiProperty({ description: 'Contraseña del usuario, debe tener entre 3 y 50 caracteres.' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  pass: string;
}

export class ReferenciarUsuarioDto {
  @ApiProperty({ description: 'Nombre de usuario para referenciar, debe tener entre 3 y 50 caracteres.' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}