import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';

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

  async findOne(usrnm: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { username: usrnm } });
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
}
