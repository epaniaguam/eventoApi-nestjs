import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ClienteEntity } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { CreateClienteDto } from 'src/dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}


  async getClientes(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  async getCliente(id: string):  Promise<ClienteEntity> {
    const objectId = await stringToObjectid(id);
    return this.clienteRepository.findOneBy({ _id: objectId });
  }

  async getClientByName(nombre: string): Promise<ClienteEntity> {
    return this.clienteRepository.findOneBy({ nombre });
  }

  async createCliente(cliente: CreateClienteDto): Promise<ClienteEntity> {
    const existeCliente = await this.clienteRepository.findOneBy({
      nombre: cliente.nombre,
    });
    if (existeCliente) {
      return existeCliente;
    }

    const newcliente = await this.clienteRepository.create(cliente);
    return await this.clienteRepository.save(newcliente);
  }

  async updateCliente(
    nombre: string,
    cliente: ClienteEntity,
  ): Promise<ClienteEntity> {
    const existeCliente = await this.clienteRepository.findOneBy({ nombre: nombre });
    if (!existeCliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.clienteRepository.update({ nombre }, cliente);
    return cliente;
  }






}
