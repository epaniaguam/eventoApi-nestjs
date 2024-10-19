import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { validate as validateUUID } from 'uuid';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(CategoriaEntity)
    private categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto):Promise<CategoriaEntity> {
    
    const existe = await this.categoriaRepository.findOne({ where: { nombreCategoria: createCategoriaDto.nombreCategoria } });
    if (existe) {
      return existe;
    }

    // Generar uuid
    const idUUID = uuidv4();

    const categoriaconUUID = Object.assign(createCategoriaDto, { id: idUUID });


    const datainto = this.categoriaRepository.create(categoriaconUUID);
    return await this.categoriaRepository.save(datainto);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findByName(nombre: string) {
    const categoria = await this.categoriaRepository.findOne({
      where: { nombreCategoria: nombre },
    });
    if (!categoria) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async findById(id: string) {
    if (!validateUUID(id)) {
      throw new HttpException('Id no válido', HttpStatus.BAD_REQUEST);
    }
    const categoria = await this.categoriaRepository.findOne({ where: { id: id } });
    if (!categoria) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async updateByName(nombre: string, updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaEntity> {

    const categoria = await this.categoriaRepository.findOne({ where: { nombreCategoria: nombre } });
    if (!categoria) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }
    
    const categoriaActualizada = Object.assign(categoria, updateCategoriaDto);

    return await this.categoriaRepository.save(categoriaActualizada);
  } 

  async removeByName(nombre: string) {
    const result = await this.categoriaRepository.findOne({ where: { nombreCategoria: nombre } });
    if (!result) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return await this.categoriaRepository.delete({ nombreCategoria: nombre });
  }

}
