import { Injectable } from '@nestjs/common';
import { CreateClienteDto, UpdateClienteDto } from './dto/cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/cliente/entities/cliente.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { stringToObjectid } from 'src/utils/convert.objetid.util';
import { validate as validateUUID } from 'uuid';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}

  async create(cliente: CreateClienteDto): Promise<ClienteEntity> {
    const existeCliente = await this.clienteRepository.findOneBy({
      nombre: cliente.nombre,
    });
    if (existeCliente) {
      return existeCliente;
    }

    const idUUID = uuidv4();
    const clienteConUUID = Object.assign(cliente, { id: idUUID });

    const newcliente = await this.clienteRepository.create(clienteConUUID);
    return await this.clienteRepository.save(newcliente);
  }

  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  async findById(id: string):  Promise<ClienteEntity> {
    if (!validateUUID(id)) {
      throw new HttpException('UUID no válido', HttpStatus.BAD_REQUEST);
    }

    const existeCliente = await this.clienteRepository.findOneBy({ id: id });
    if (!existeCliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    return existeCliente;
  }

  async findOneByName(nombre: string): Promise<ClienteEntity> {
    // console.log('nombre', nombre);
    const cliente = this.clienteRepository.findOneBy({ nombre: nombre });
    if (!cliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }
    return cliente;
  }

  async updateById(id: string, cliente: UpdateClienteDto): Promise<ClienteEntity> {
    if (!validateUUID(id)) {
      throw new HttpException('UUID no válido', HttpStatus.BAD_REQUEST);
    }
    const existeCliente = await this.clienteRepository.findOneBy({ id: id });
    if (!existeCliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.clienteRepository.update({ id: id }, cliente);
    return { ...existeCliente, ...cliente };
  }
  

  async updateByName(
    nombre: string,
    cliente: UpdateClienteDto,
  ): Promise<UpdateClienteDto> {
    const existeCliente = await this.clienteRepository.findOneBy({ nombre: nombre });
    if (!existeCliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }
    await this.clienteRepository.update({ nombre }, cliente);
    return { ...existeCliente, ...cliente };
  }

  async removeById(id: string): Promise<{ message: string }> {
    if (!validateUUID(id)) {
      throw new HttpException('UUID no válido', HttpStatus.BAD_REQUEST);
    }

    const existeCliente = await this.clienteRepository.findOneBy({ id: id });
    if (!existeCliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.clienteRepository.delete({ id: id });
    return { message: `Cliente de id: ${id}, eliminado` };
  }

  async removeByName(nombre: string): Promise<{ message: string }> {
    console.log('nombre', nombre);
    const existeCliente = await this.clienteRepository.findOneBy({ nombre });
    if (!existeCliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.clienteRepository.delete({ nombre });
    return { message: `Cliente de nombre: ${nombre}, eliminado` };
  }

}
