import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export async function stringToObjectid(id: string): Promise<ObjectId> {
  // Verificar si el ID es un ObjectId válido
  if (!ObjectId.isValid(id)) {
    throw new BadRequestException('ID inválido');
  }
  // Convertir el string a ObjectId
  return new ObjectId(id);
}
