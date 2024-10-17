import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventoDto,UpdateEventoDto } from './dto/evento.dto';
import { EventoEntity } from './entities/evento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { validate as validateUUID } from 'uuid';


@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(EventoEntity)
    private eventoRepository: Repository<EventoEntity>,
  ) {}


  async createEvento(evento: CreateEventoDto): Promise<EventoEntity> {
    const existeEvento = await this.eventoRepository.findOneBy({
      nombreEvento: evento.nombreEvento,
    });
    if (existeEvento) {
      return existeEvento;
    }

    const newEvento = this.eventoRepository.create(evento);
    return await this.eventoRepository.save(newEvento);
  }

  async findAll(): Promise<EventoEntity[]> {
    return this.eventoRepository.find();
  }

  async findOneById(id: string): Promise<EventoEntity> {
    if(!validateUUID(id)) {
      throw new HttpException('Id no válido', HttpStatus.BAD_REQUEST);
    }
    return this.eventoRepository.findOneBy({ id: id });
  }

  async findOneByName(nombre: string): Promise<EventoEntity> {
    console.log('nombre', nombre);
    const evento = this.eventoRepository.findOneBy({ nombreEvento: nombre });
    if (!evento) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }
    return evento;
  }

  async updateById(id: string, eventoUpdate: UpdateEventoDto ): Promise<EventoEntity> {
    if(!validateUUID(id)) {
      throw new HttpException('Id no válido', HttpStatus.BAD_REQUEST);
    }
    const existeEvento = await this.eventoRepository.findOneBy({ id: id });

    if (!existeEvento) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);  
    }

    const nombreIgual = existeEvento.nombreEvento === eventoUpdate.nombreEvento
    const fechaIgual = existeEvento.fecha === eventoUpdate.fecha

    if(nombreIgual && fechaIgual) {
      new HttpException('Otro evento con nombre y fecha iguales ya existe', HttpStatus.CONFLICT);
    }

    const eventoActualizado = Object.assign(existeEvento, eventoUpdate);
    
    return await this.eventoRepository.save(eventoActualizado);
  }

  async removeById(id: string): Promise<EventoEntity> {
    if(!validateUUID(id)) {
      throw new HttpException('Id no válido', HttpStatus.BAD_REQUEST);
    }
    const evento = await this.eventoRepository.findOneBy({ id: id });
    if (!evento) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.eventoRepository.remove(evento);
  }
}
