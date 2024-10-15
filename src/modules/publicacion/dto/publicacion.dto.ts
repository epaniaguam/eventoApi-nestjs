import { PartialType } from '@nestjs/mapped-types';


export class CreatePublicacionDto {}

export class UpdatePublicacionDto extends PartialType(CreatePublicacionDto) {}