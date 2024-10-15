import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VentasEntity } from 'src/entities/ventas.entity';
import { Repository } from 'typeorm';
import { ClienteService } from './servicesAux/cliente.service';
import { EventoService } from './servicesAux/evento.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CategoriaService } from '../categoria/categoria.service';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
@Injectable()
export class ActividadService {

  constructor(
    @InjectRepository(VentasEntity)
    private ventasRepository: Repository<VentasEntity>,
    private clienteService: ClienteService,
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
  ) {}

  create(createActividadDto: any) {
    return 'This action adds a new actividad';
  }

  private async obtenerVentasById(venta: VentasEntity ): Promise<any>{
    const cliente = await this.clienteService.getCliente(venta.clienteId.toString());
    const evento = await this.eventoService.getEvento(venta.eventoId.toString());
    const usuario = await this.usuarioService.findById(venta.usuarioId.toString());
    const categoria = await this.categoriaService.findById(evento.categoriaId.toString());


    const usuarioData = {
      _id: usuario._id,
      name: usuario.name,
      username: usuario.username,
    }

    const clienteData = {
      _id: cliente._id,
      nombre: cliente.nombre,
      edad: cliente.edad,
    }

    const eventoData = {
      _id: evento._id,
      nombreEvento: evento.nombreEvento,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      lugar: evento.lugar,
      categoria: {
        _id: categoria._id,
        nombreCategoria: categoria.nombreCategoria,
      },
    };

    return {
      _id: venta._id,
      usuario: usuarioData,
      cliente: clienteData,
      evento: eventoData,
    };
  }

  async findAll() {
    const ventas = await this.ventasRepository.find();

    const ventasConDetalles = await Promise.all(ventas.map(async (venta) => {
      return await this.obtenerVentasById(venta);
    }));

    return ventasConDetalles;
  }

  async findOne(id: string) {
    const objectId = await stringToObjectid(id);
    const venta = await this.ventasRepository.findOne({ where: { _id: objectId } });
    return await this.obtenerVentasById(venta);
  }

  update(id: number, updateActividadDto: any) {
    return `This action updates a #${id} actividad`;
  }

  remove(id: number) {
    return `This action removes a #${id} actividad`;
  }


}
