import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  nombreCategoria: string;
}
export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
