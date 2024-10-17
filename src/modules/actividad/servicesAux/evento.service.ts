import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventoEntity } from 'src/evento/entities/evento.entity';
import { Repository } from 'typeorm';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { CreateEventoDto, UpdateEventoDto } from 'src/dto/evento.dto';

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
    const objectId = await stringToObjectid(id);
    return this.eventoRepository.findOneBy({ _id: objectId });
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
    const objectId = await stringToObjectid(id);
    const existeEvento = await this.eventoRepository.findOneBy({ _id: objectId });
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

  async removeById(evento: EventoEntity): Promise<EventoEntity> {
    return await this.eventoRepository.remove(evento);
  }

}
