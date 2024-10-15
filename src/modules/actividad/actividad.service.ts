import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VentasEntity } from 'src/entities/ventas.entity';
import { DataSource, Repository } from 'typeorm';
import { ClienteService } from './servicesAux/cliente.service';
import { EventoService } from './servicesAux/evento.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CategoriaService } from '../categoria/categoria.service';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { RegistrarVentaDto, UpdateVentaDto } from 'src/dto/venta.dto';
import { UpdateCategoriaDto } from '../categoria/dto/categoria.dto';
import { EventoEntity } from 'src/entities/evento.entity';
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
  ) {}

  async create(venta: RegistrarVentaDto): Promise<VentasEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existeUsuario = await this.usuarioService.findOneByUsername(venta.usuario.username);

      // Crea el cliente si no existe
      const cliente = await this.clienteService.createCliente(venta.cliente);

      // Crea la categoria si no existe
      const categoria = await this.categoriaService.create(venta.evento.categoria);

      // Crea el evento si no existe
      const registroEvento = Object.assign(venta.evento, { categoriaId: categoria._id });
      const evento = await this.eventoService.createEvento(registroEvento);

      // Buscar si existe un venta con el mismo cliente y evento

      const existeVenta = await this.ventasRepository.findOne({
        where: { 
          clienteId: cliente._id,
          eventoId: evento._id,
        },
      });

      if (existeVenta) {
        throw new HttpException({ message: 'Ya existe una venta con el mismo cliente y evento' }, HttpStatus.CONFLICT);
      }
      // console.log('existeVenta', existeVenta);

      // Crea la venta
      const registroVenta = Object.assign(venta, {
        clienteId: cliente._id,
        eventoId: evento._id,
        usuarioId: existeUsuario._id,
      });

      const datainto = this.ventasRepository.create(registroVenta);
      const savedVenta = await queryRunner.manager.save(datainto);

      // Confirma la transacción si todo salió bien
      await queryRunner.commitTransaction();

      return savedVenta;
    } catch (error) {
      // Deshace la transacción si algo falla
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Libera el query runner
      await queryRunner.release();
    }
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

  async update(id: string, updateVenta: UpdateVentaDto): Promise<VentasEntity> {
    // console.log('updateVenta', updateVenta);
    // console.log('id', id);  

    const objectId = await stringToObjectid(id);
    const venta = await this.ventasRepository.findOne({ where: { _id: objectId } });
    console.log('venta', venta);

    if (!venta) {
      throw new HttpException({ message: 'Venta no encontrada' }, HttpStatus.NOT_FOUND);
    }

    console.log('updateVentaCliente', updateVenta.cliente);
    console.log('updateVentaEvento', updateVenta.evento);
    console.log('updateVentaUsuario', updateVenta.usuario);

    // Actualizamos usuario
    if(updateVenta.usuario !== undefined){
      const buscarUsuario = await this.usuarioService.findOneByUsername(updateVenta.usuario.username);
      // console.log('buscarUsuario', buscarUsuario);
      if(buscarUsuario){
        venta.usuarioId = buscarUsuario._id;
      }
    }
 
    // Actualizamos cliente
    //// Si no existe el cliente, se debe crear independientemente antes de  actualizar con ese cliente
    if(updateVenta.cliente !== undefined){
      const buscarCliente = await this.clienteService.getClientByName(updateVenta.cliente.nombre);
      console.log('buscarCliente', buscarCliente);
      if(buscarCliente){
        venta.clienteId = buscarCliente._id;
      }
    }

    // Actualizamos evento
    //// Modificaremos el evento existente con los nuevos datos, es decir, no se asignara otro evento, sino que se modificara el existente
    if(updateVenta.evento !== undefined){

      let obtenerDataEvento = await this.eventoService.getEventoById(venta.eventoId.toString());
      // Solo si la categoria del evento ha cambiado, asignamos la nueva categoria al evento
      if(updateVenta.evento.categoria !== undefined){
        const buscarCategoria = await this.categoriaService.findOne(updateVenta.evento.categoria.nombreCategoria);
        console.log('buscarCategoria', buscarCategoria);  
        if(!buscarCategoria){
          throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
        }
        
        // Actualizamos la categoria del evento
        obtenerDataEvento.categoriaId = buscarCategoria._id;
      }

      // Actualizamos los datos del evento
      Object.assign(obtenerDataEvento, updateVenta.evento);
      venta.eventoId = obtenerDataEvento._id;

      console.log('obtenerDataEvento', obtenerDataEvento);
      // console.log('venta', venta);
      
      await this.eventorepository.save(obtenerDataEvento);

    }

    // Actualizamos el precio
    if(updateVenta.precio !== undefined){
      venta.precio = updateVenta.precio;
    }

    return await this.ventasRepository.save(venta);
  }

  async remove(id: string): Promise<VentasEntity> {

    const objectId = await stringToObjectid(id);
    const existeVenta = await this.ventasRepository.findOneBy({ _id: objectId });
    if (!existeVenta) {
      throw new HttpException('Venta no encontrada', HttpStatus.NOT_FOUND);
    }

    const evento = await this.eventoService.getEventoById(existeVenta.eventoId.toString());
    if (!evento) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }
    await this.eventoService.remove(evento);

    return await this.ventasRepository.remove(existeVenta);
  }

  private async obtenerVentasById(venta: VentasEntity ): Promise<any>{
    const cliente = await this.clienteService.getCliente(venta.clienteId.toString());
    const evento = await this.eventoService.getEventoById(venta.eventoId.toString());
    const usuario = await this.usuarioService.findById(venta.usuarioId.toString());
    const categoria = await this.categoriaService.findById(evento.categoriaId.toString());

    // console.log('evento', evento);

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
      precio: venta.precio ?? 0,
    };

    return {
      _id: venta._id,
      usuario: usuarioData,
      cliente: clienteData,
      evento: eventoData,
    };
  }
}
