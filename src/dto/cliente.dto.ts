import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateClienteDto {
  
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsOptional()
  edad: number;

}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
