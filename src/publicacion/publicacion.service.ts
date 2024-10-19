import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreatePublicacionDto,
  UpdatePublicacionDto,
} from './dto/publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicacionEntity } from './entities/publicacion.entity';
import { EventoEntity } from '../evento/entities/evento.entity';
import { Repository } from 'typeorm';
import { CategoriaService } from '../categoria/categoria.service';
import { EventoService } from 'src/evento/evento.service';
import { validate as validateUUID } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(PublicacionEntity)
    private publicacionRepository: Repository<PublicacionEntity>,
    @InjectRepository(EventoEntity)
    private eventoRepository: Repository<EventoEntity>,

    private eventoService: EventoService,
    private categoriaService: CategoriaService,
  ) {}

  async create(
    createPublicacionDto: CreatePublicacionDto,
  ): Promise<PublicacionEntity> {
    const existePublicacion = await this.publicacionRepository.findOne({
      where: {
        tituloPublicacion: createPublicacionDto.tituloPublicacion,
        lugarPublicacion: createPublicacionDto.lugarPublicacion,
        // fechaPublicacion : createPublicacionDto.fechaPublicacion,
      },
    });

    if (existePublicacion) {
      throw new HttpException(
        { message: 'La publicacion ya existe' },
        HttpStatus.CONFLICT,
      );
    }
    const existeEvento = await this.eventoService.findById(
      createPublicacionDto.eventoId,
    );

    const idUUID = uuidv4();
    const publicacionConUUID = Object.assign(createPublicacionDto, {
      id: idUUID,
    });

    const datainto = this.publicacionRepository.create(publicacionConUUID);
    return await this.publicacionRepository.save(datainto);
  }

  async findAll() {
    const publicaciones = await this.publicacionRepository.find();
    return publicaciones;
  }

  async findAllDetailed() {
    const publicaciones = await this.publicacionRepository.find();

    const publicacionDetalles = await Promise.all(
      publicaciones.map(async (publi) => {
        return await this.obtenerPublicacionesByIdEvento(publi);
      }),
    );

    return publicacionDetalles;
  }

  async findByName(nombre: string) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { tituloPublicacion: nombre },
    });
    if (!publicacion) {
      throw new HttpException(
        { message: 'Publicacion no encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.obtenerPublicacionesByIdEvento(publicacion);
  }

  async findById(id: string) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id: id },
    });

    if (!publicacion) {
      throw new HttpException(
        { message: 'Publicacion no encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.obtenerPublicacionesByIdEvento(publicacion);
  }

  async updateByName(nombre: string, updPubliDto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { tituloPublicacion: nombre },
    });

    if (!publicacion) {
      throw new HttpException(
        { message: 'Publicacion no encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (updPubliDto.eventoId !== undefined) {
      const existeEvento = await this.eventoRepository.findOne({
        where: { id: updPubliDto.eventoId },
      });
      if (!existeEvento) {
        throw new HttpException(
          { message: `Evento con id: ${updPubliDto.eventoId}, no encontrado` },
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const publicacionUpdate = Object.assign(publicacion, updPubliDto);
    return await this.publicacionRepository.save(publicacionUpdate);
  }

  async updateById(id: string, updPubliDto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id: id },
    });

    if (!publicacion) {
      throw new HttpException(
        { message: 'Publicacion no encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (updPubliDto.eventoId !== undefined) {
      const existeEvento = await this.eventoRepository.findOne({
        where: { id: updPubliDto.eventoId },
      });
      if (!existeEvento) {
        throw new HttpException(
          { message: `Evento con id: ${updPubliDto.eventoId}, no encontrado` },
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const publicacionUpdate = Object.assign(publicacion, updPubliDto);
    return await this.publicacionRepository.save(publicacionUpdate);
  }

  async removeById(id: string): Promise<PublicacionEntity> {
    if (!validateUUID(id)) {
      throw new HttpException(
        { message: 'Id no válido' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const existePublicacion = await this.publicacionRepository.findOne({
      where: { id: id },
    });
    if (!existePublicacion) {
      throw new HttpException(
        { message: `Publicacion con id: ${id}, no encontrada` },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.publicacionRepository.remove(existePublicacion);
  }

  private async obtenerPublicacionesByIdEvento(
    publicacion: PublicacionEntity,
  ): Promise<any> {
    const evento = await this.eventoService.findById(publicacion.eventoId);
    const categoria = await this.categoriaService.findById(evento.categoriaId);

    const eventoData = {
      id: evento.id,
      nombreEvento: evento.nombreEvento,
      fecha: evento.fecha,
      lugar: evento.lugar,
      categoria: {
        id: categoria.id,
        nombreCategoria: categoria.nombreCategoria,
      },
    };

    return {
      id: publicacion.id,
      tituloPublicacion: publicacion.tituloPublicacion,
      lugarPublicacion: publicacion.lugarPublicacion,
      fechaPublicacion: publicacion.fechaPublicacion,
      evento: eventoData,
    };
  }
}
