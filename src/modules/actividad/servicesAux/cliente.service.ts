import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ClienteEntity } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}

  private async convertirObjectId(id: string): Promise<ObjectId>{
    // Verificar si el ID es un ObjectId válido
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido');
    }
    // Convertir el string a ObjectId
    const objectId = new ObjectId(id);
    return objectId;
  }

  async getClientes(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  //
  async getCliente(id: string): Promise<ClienteEntity> {
    const objectId = await this.convertirObjectId(id);
    return this.clienteRepository.findOneBy({ _id: objectId });
  }

  async createCliente(cliente: ClienteEntity): Promise<ClienteEntity> {
    const existeCliente = await this.clienteRepository.findOneBy({
      nombre: cliente.nombre,
    });
    if (existeCliente) {
      throw new HttpException('Cliente ya existe', HttpStatus.CONFLICT);
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
