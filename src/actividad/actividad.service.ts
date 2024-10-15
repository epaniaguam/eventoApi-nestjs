import { Injectable } from '@nestjs/common';

@Injectable()
export class ActividadService {
  create(createActividadDto: any) {
    return 'This action adds a new actividad';
  }

  findAll() {
    return `This action returns all actividad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actividad`;
  }

  update(id: number, updateActividadDto: any) {
    return `This action updates a #${id} actividad`;
  }

  remove(id: number) {
    return `This action removes a #${id} actividad`;
  }
}
