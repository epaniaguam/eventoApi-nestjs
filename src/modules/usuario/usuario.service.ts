import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { validate as validateUUID } from 'uuid';
import {v4 as uuidv4} from 'uuid';

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

    const hashedPassword = await bcrypt.hash(createUsuarioDto.pass, 10); 
    createUsuarioDto.pass = hashedPassword;
    
    const idUUID = uuidv4();
    const usuarioConUUID = Object.assign(createUsuarioDto, { id: idUUID });

    const datainto = this.usuarioRepository.create(usuarioConUUID);
    return await this.usuarioRepository.save(datainto);
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findByUsername(usrnm: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { username: usrnm } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async findById(id: string) {
    if(!validateUUID(id)) {
      throw new HttpException('UUID no válido', HttpStatus.BAD_REQUEST);
    }
    const usuario = await this.usuarioRepository.findOne({ where: { id: id } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async updateByName(usrnm: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { username: usrnm } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }

    const usuarioIgual = updateUsuarioDto.username;

    if (usuarioIgual) {
      const existe = await this.usuarioRepository.findOne({ where: { username: usuarioIgual } });
      if (existe) {
        throw new HttpException({ message: `Otro usuario con ${updateUsuarioDto.username} ya existe` }, HttpStatus.CONFLICT);
      }
    }
    
    const usuarioActualizado = Object.assign(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuarioActualizado);
  }

  async updateById(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    if(!validateUUID(id)) {
      throw new HttpException('UUID no válido', HttpStatus.BAD_REQUEST);
    }
    const usuario = await this.usuarioRepository.findOne({ where: { id: id } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }

    const usuarioIgual = updateUsuarioDto.username;

    if (usuarioIgual) {
      const existe = await this.usuarioRepository.findOne({ where: { username: usuarioIgual } });
      if (existe) {
        throw new HttpException({ message: `Otro usuario con ${updateUsuarioDto.username} ya existe` }, HttpStatus.CONFLICT);
      }
    }

    const usuarioActualizado = Object.assign(usuario, updateUsuarioDto);

    return await this.usuarioRepository.save(usuarioActualizado);
  }

  async removeByUsername(username: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { username: username } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return await this.usuarioRepository.delete({ username: username });
  }

  
  async removeById(id: string) {

    if(!validateUUID(id)) {
      throw new HttpException('UUID no válido', HttpStatus.BAD_REQUEST);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id: id } });
    if (!usuario) {
      throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
    }
    return await this.usuarioRepository.delete({ id: id });
  }
  

}
