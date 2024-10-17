import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicacionDto, UpdatePublicacionDto } from './dto/publicacion.dto';
import { EventoService } from '../actividad/servicesAux/evento.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicacionEntity } from './entities/publicacion.entity';
import { EventoEntity } from 'src/entities/evento.entity';
import { Repository } from 'typeorm';
import { CategoriaService } from '../categoria/categoria.service';

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

  async create(createPublicacionDto: CreatePublicacionDto): Promise<PublicacionEntity> {

    const existePublicacion = await this.publicacionRepository.findOne({
      where: { 
        tituloPublicacion : createPublicacionDto.tituloPublicacion,
        lugarPublicacion : createPublicacionDto.lugarPublicacion,
        // fechaPublicacion : createPublicacionDto.fechaPublicacion,
      },
    });

    if (existePublicacion) {
      throw new HttpException({ message: 'La publicacion ya existe' }, HttpStatus.CONFLICT);
    }


    const existeEvento = await this.eventoService.findOneByName(createPublicacionDto.eventoNombre);
    if (!existeEvento) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }

    const publicacionCompleta = Object.assign(createPublicacionDto, { eventoId : existeEvento._id });

    console.log('publicacionCompleta', publicacionCompleta);

    const datainto = this.publicacionRepository.create(publicacionCompleta);
    return await this.publicacionRepository.save(datainto);
    
  }

  async findAll() {
    const publicaciones = await this.publicacionRepository.find();

    const publicacionDetalles = await Promise.all(publicaciones.map(async (publi) => {
      return await this.obtenerPublicacionesByIdEvento(publi);
    }));

    return publicacionDetalles;
  }

  async findOne(nombre: string) {
    const publicacion = await this.publicacionRepository.findOne({ where: { tituloPublicacion: nombre } });

    if (!publicacion) {
      throw new HttpException({ message: 'Publicacion no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return await this.obtenerPublicacionesByIdEvento(publicacion);
  }

  async update(nombre: string, updPubliDto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionRepository.findOne({ where: { tituloPublicacion: nombre } });

    if (!publicacion) {
      throw new HttpException({ message: 'Publicacion no encontrada' }, HttpStatus.NOT_FOUND);
    }

    // Actualizamos evento
    // Designar un nuevo evento a la publicacion
    if(updPubliDto.eventoNombre !== undefined){
      const existeEvento = await this.eventoService.findOneByName(updPubliDto.eventoNombre);
      console.log('existeEvento', existeEvento);
      if (existeEvento) {
        publicacion.eventoId = existeEvento._id;
      }else{
        throw new HttpException({ message: 'Evento no encontrado' }, HttpStatus.NOT_FOUND);
      }
    }

    if(updPubliDto.tituloPublicacion !== undefined){
      publicacion.tituloPublicacion = updPubliDto.tituloPublicacion;
    }

    if(updPubliDto.lugarPublicacion !== undefined){
      publicacion.lugarPublicacion = updPubliDto.lugarPublicacion;
    }

    if(updPubliDto.fechaPublicacion !== undefined){
      publicacion.fechaPublicacion = updPubliDto.fechaPublicacion;
    }

    return await this.publicacionRepository.save(publicacion);

  }

  async remove(titulo: string): Promise<PublicacionEntity> {
    const existePublicacion = await this.publicacionRepository.findOne({ where: { tituloPublicacion: titulo } });
    if (!existePublicacion) {
      throw new HttpException({ message: 'Publicacion no encontrada' }, HttpStatus.NOT_FOUND);
    }

    return await this.publicacionRepository.remove(existePublicacion);
  }

  private async obtenerPublicacionesByIdEvento(publicacion: PublicacionEntity): Promise<any> {

    const evento = await this.eventoService.findOneById(publicacion.eventoId.toString());

    const categoria = await this.categoriaService.findById(evento.categoriaId.toString());
  

    const eventoData = {
      _id: evento._id,
      nombreEvento: evento.nombreEvento,
      fecha: evento.fecha,
      lugar: evento.lugar,
      categoria: {
        _id: categoria._id,
        nombreCategoria: categoria.nombreCategoria,
      },
    }

    return {
      _id: publicacion._id,
      tituloPublicacion: publicacion.tituloPublicacion,
      lugarPublicacion: publicacion.lugarPublicacion,
      fechaPublicacion: publicacion.fechaPublicacion,
      evento: eventoData,
    }
  }
}
