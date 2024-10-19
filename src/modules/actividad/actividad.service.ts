import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VentasEntity } from 'src/entities/ventas.entity';
import { DataSource, Repository } from 'typeorm';
import { ClienteService } from '../../cliente/cliente.service';
import { EventoService } from './servicesAux/evento.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CategoriaService } from '../categoria/categoria.service';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { CreateVentaDto, UpdateVentaDto } from 'src/venta/dto/venta.dto';
import { UpdateCategoriaDto } from '../categoria/dto/categoria.dto';
import { EventoEntity } from 'src/evento/entities/evento.entity';
import { VentaService } from 'src/venta/venta.service';
@Injectable()
export class ActividadService {

  constructor(
    @InjectRepository(VentasEntity)
    private ventasRepository: Repository<VentasEntity>,
    @InjectRepository(EventoEntity)
    private eventorepository: Repository<EventoEntity>,
    private clienteService: ClienteService,
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private dataSource: DataSource,
    private ventaService: VentaService,
  ) {}

  async createVenta(venta: CreateVentaDto): Promise<any> {
    return await this.ventaService.create(venta);    
  }
  
  async findAllVentas() {
    return await this.ventaService.findAll();
  }

  async findOneVenta(id: string) {
    return await this.ventaService.findById(id);
  }

  async findOneVentaDetailed(id: string) {
    return await this.ventaService.findByIdDetailed(id);
  }

  async updateVentasById(id: string, updateVenta: UpdateVentaDto): Promise<any> {
    return await this.ventaService.updateById(id, updateVenta);

  //   const objectId = await stringToObjectid(id);
  //   const existeVenta = await this.ventasRepository.findOneBy({ _id: objectId });
  //   if (!existeVenta) {
  //     throw new HttpException('Venta no encontrada', HttpStatus.NOT_FOUND);
  //   }

  //   const evento = await this.eventoService.findOneById(existeVenta.eventoId.toString());
  //   if (!evento) {
  //     throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
  //   }
  //   await this.eventoService.removeById(evento);

  //   return await this.ventasRepository.remove(existeVenta);
  }

  async removeVentasById(id: string): Promise<any> {
    return await this.ventaService.removeById(id);
  }

}
