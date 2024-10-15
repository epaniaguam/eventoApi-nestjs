import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    // console.log('Categoria recibida', createUsuarioDto);

    const existe = await this.usuarioRepository.findOne({ where: { username: createUsuarioDto.username } });

    if (existe) {
      throw new HttpException({ message: 'El usuario ya existe' }, HttpStatus.CONFLICT);
    }

    const datainto = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(datainto);
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOneByUsername(usrnm: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { username: usrnm } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async findById(id: string) {
    const objectId = await this.convertirObjectId(id);
    const usuario = await this.usuarioRepository.findOne({ where: { _id: objectId } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async update(usrnm: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { username: usrnm } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }

    const usuarioIgual = updateUsuarioDto.username;

    if (usuarioIgual) {
      const existe = await this.usuarioRepository.findOne({ where: { username: usuarioIgual } });
      if (existe) {
        throw new HttpException({ message: 'Otro usuario con ese nombre de usuario ya existe' }, HttpStatus.CONFLICT);
      }
    }

    const usuarioActualizado = Object.assign(usuario, updateUsuarioDto);

    return await this.usuarioRepository.save(usuarioActualizado);
  }

  async remove(usrnm: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { username: usrnm } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return await this.usuarioRepository.delete({ username: usrnm });
  }

  private async convertirObjectId(id: string): Promise<ObjectId>{
    // Verificar si el ID es un ObjectId válido
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido');
    }
    // Convertir el string a ObjectId
    const objectId = new ObjectId(id);
    return objectId;
  }

}
