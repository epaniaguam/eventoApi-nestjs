import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ description: 'Nombre de usuario, debe tener entre 3 y 20 caracteres.' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @ApiProperty({ description: 'Contraseña, debe tener entre 3 y 20 caracteres.' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  password: string;
}

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}