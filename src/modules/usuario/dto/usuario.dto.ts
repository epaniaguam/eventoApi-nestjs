import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Length} from 'class-validator';

export class CreateUsuarioDto {

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  pass: string;
}

export class ReferenciarUsuarioDto {

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;
}


export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
