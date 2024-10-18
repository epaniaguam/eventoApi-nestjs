import { HttpException, Injectable } from '@nestjs/common';
import { CreateVentaDto,UpdateVentaDto } from './dto/venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaEntity } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { validate as validateUUID } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import { ClienteEntity } from 'src/cliente/entities/cliente.entity';
import { EventoEntity } from 'src/evento/entities/evento.entity';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { EventoService } from 'src/evento/evento.service';


@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(VentaEntity)
    private ventasRepository: Repository<VentaEntity>,
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
    @InjectRepository(EventoEntity)
    private eventoRepository: Repository<EventoEntity>,

    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private eventoService: EventoService,
  ) {}

  async create(createVentaDto: CreateVentaDto) {
    // VALIDACIONES
    // Comprobar si los id de usuario, cliente y evento existen
    if(validateUUID(createVentaDto.usuarioId)) {
      const existeUsuario = await this.usuarioRepository.findOne({
        where: { 
          id: createVentaDto.usuarioId,
        },
      });

      if(!existeUsuario){
        throw new HttpException({ message: `El usuario con id ${createVentaDto.usuarioId} no existe` }, 404);
      }

    }else{
      throw new HttpException({ message: 'El id de usuario no es válido' }, 400);
    }

    if(validateUUID(createVentaDto.clienteId)) {
      const existeCliente = await this.clienteRepository.findOne({
        where: { 
          id: createVentaDto.clienteId,
        },
      });

      if(!existeCliente){
        throw new HttpException({ message: `El cliente con id ${createVentaDto.clienteId} no existe` }, 404);
      }
    }else{
      throw new HttpException({ message: 'El id de cliente no es válido' }, 400);
    }

    if(validateUUID(createVentaDto.eventoId)) {
      const existeEvento = await this.eventoRepository.findOne({
        where: { 
          id: createVentaDto.eventoId,
        },
      });

      if(!existeEvento){
        throw new HttpException({ message: `El evento con id ${createVentaDto.eventoId} no existe` }, 404);
      }
    }else{
      throw new HttpException({ message: 'El id de evento no es válido' }, 400);
    }
    
    // fecha de venta
    if( createVentaDto.fechaVenta > new Date() ){
      throw new HttpException({ message: 'La fecha de venta no puede ser mayor a la fecha actual' }, 400);
    }

    const ventaExistente = await this.ventasRepository.findOne({
      where: {
        clienteId: createVentaDto.clienteId,
        eventoId: createVentaDto.eventoId,
      }
    });

    if (ventaExistente) {
      throw new HttpException({ message: 'Ya existe una venta con el mismo cliente y evento' }, 409);
    }
    // FIN DE VALIDACIONES

    const idUUID = uuidv4();
    const ventaConUUID = Object.assign(createVentaDto, { id: idUUID,});

    const datainfo = this.ventasRepository.create(ventaConUUID);
    return await this.ventasRepository.save(datainfo);
  }

  async findAll() {
    return await this.ventasRepository.find();
  }

  findById(id: string) {
    const existeVenta = this.ventasRepository.findOne({
      where: { 
        id: id,
      },
    });
    if (!existeVenta) {
      throw new HttpException({ message: `La venta con id ${id} no existe` }, 404);
    }
    return existeVenta;
  }

  async findByIdDetailed(id: string) {
    const existeVenta = await this.ventasRepository.findOne({
      where: { 
        id: id,
      },
    });
    if (!existeVenta) {
      throw new HttpException({ message: `La venta con id ${id} no existe` }, 404);
    }

    const result = await this.obtenerVentaByIdEvento(existeVenta);

    return result;
  }

  async updateById(id: string, updateVentaDto: UpdateVentaDto): Promise<VentaEntity> {
    if(!validateUUID(id)) {
      throw new HttpException({ message: 'Id no válido' }, 400);
    }
    const existeVenta = await this.ventasRepository.findOne({
      where: { 
        id: id,
      },
    });

    if (!existeVenta) {
      throw new HttpException({ message: `La venta con id ${id} no existe` }, 404);
    }

    const ventaUpdate = Object.assign(existeVenta, updateVentaDto);
    return await this.ventasRepository.save(ventaUpdate);
  }

  async removeById(id: string): Promise<VentaEntity> {
    if(!validateUUID(id)) {
      throw new HttpException({ message: 'Id no válido' }, 400);
    }
    const existeVenta = await this.ventasRepository.findOne({
      where: { 
        id: id,
      },
    });

    if (!existeVenta) {
      throw new HttpException({ message: `La venta con id ${id} no existe` }, 404);
    }

    return await this.ventasRepository.remove(existeVenta);
  }

  
  private async obtenerVentaByIdEvento(venta: VentaEntity): Promise<any> {
    const usuario = await this.usuarioService.findById(venta.usuarioId);
    // console.log('usuario', usuario);
    const cliente = await this.clienteService.findById(venta.clienteId);
    // console.log('cliente', cliente);
    const evento = await this.eventoService.findByIdDetailed(venta.eventoId);
    console.log('evento', evento);

    const usuarioData = {
      id: usuario.id,
      name: usuario.name,
      username: usuario.username,
    }
    const clienteData = {
      id: cliente.id,
      nombre: cliente.nombre,
      edad: cliente.edad,
    }
    const result = {
      id: venta.id,
      usuario: usuarioData,
      cliente: clienteData,
      evento: evento,
      precio: venta.precio,
    }
    return result;
  }
}