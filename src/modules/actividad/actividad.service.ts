import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VentasEntity } from 'src/entities/ventas.entity';
import { Repository } from 'typeorm';
import { ClienteService } from './servicesAux/cliente.service';
import { EventoService } from './servicesAux/evento.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CategoriaService } from '../categoria/categoria.service';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { RegistrarVentaDto } from 'src/dto/venta.dto';
import { Console } from 'console';
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

  async create(venta: RegistrarVentaDto): Promise<VentasEntity> {
    
    const existeUsuario = await this.usuarioService.findOneByUsername(venta.usuario.username);

    // crea el cliente si no existe
    const cliente = await this.clienteService.createCliente(venta.cliente);

    // crea la categoria si no existe
    const categoria = await this.categoriaService.create(venta.evento.categoria);

    // crea el evento si no existe
    const registroEvento = Object.assign(venta.evento, {categoriaId: categoria._id});
    const evento = await this.eventoService.createEvento(registroEvento);

    // crea la venta
    const registroVenta = Object.assign(venta, {clienteId: cliente._id, eventoId: evento._id, usuarioId: existeUsuario._id});

    const datainto = this.ventasRepository.create(registroVenta);
    return await this.ventasRepository.save(datainto);

    // console.log('Categoria encontrada', categoria);
    // console.log('Usuario encontrado', existeUsuario);
    // console.log('Cliente encontrado', cliente);
    // console.log('Evento encontrado' , evento);
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
}
