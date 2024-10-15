import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoriaDto {}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
