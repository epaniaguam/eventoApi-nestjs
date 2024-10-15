import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  password: string;
}

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}