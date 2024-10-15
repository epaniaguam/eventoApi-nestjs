import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { EventoEntity } from 'src/entities/evento.entity';
import { Repository } from 'typeorm';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { CreateEventoDto } from 'src/dto/evento.dto';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(EventoEntity)
    private eventoRepository: Repository<EventoEntity>,
  ) {}


  async getEventos(): Promise<EventoEntity[]> {
    return this.eventoRepository.find();
  }

  async getEvento(id: string): Promise<EventoEntity> {
    const objectId = await stringToObjectid(id);
    return this.eventoRepository.findOneBy({ _id: objectId });
  }

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

  // async updateEvento(
  //   nombre: string,
  //   evento: EventoEntity,
  // ): Promise<EventoEntity> {
  //   const existeEvento = await this.eventoRepository.findOneBy({
  //     nombreEvento: nombre,
  //   });
  //   if (!existeEvento) {
  //     throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
  //   }

  //   await this.eventoRepository.update({ nombre }, evento);
  //   return evento;
  // }
}
