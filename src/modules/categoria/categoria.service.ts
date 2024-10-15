import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { stringToObjectid } from 'src/utils/convert.objetid.util';

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

    const datainto = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(datainto);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findOne(nombre: string) {
    const categoria = await this.categoriaRepository.findOne({
      where: { nombreCategoria: nombre },
    });
    if (!categoria) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async findById(id: string) {
    const objectId = await stringToObjectid(id);
    const categoria = await this.categoriaRepository.findOne({ where: { _id: objectId } });
    if (!categoria) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async update(nombre: string, updateCategoriaDto: UpdateCategoriaDto) {

    const categoria = await this.categoriaRepository.findOne({ where: { nombreCategoria: nombre } });
    if (!categoria) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }

    const categoriaIgual = updateCategoriaDto.nombreCategoria;

    if (categoriaIgual) {
      const existe = await this.categoriaRepository.findOne({ where: { nombreCategoria: categoriaIgual } });
      if (existe) {
        throw new HttpException({ message: 'Otra categoria con ese nombre ya existe' }, HttpStatus.CONFLICT);
      }
    }

    const categoriaActualizada = Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoriaActualizada);
  }

  async remove(nombre: string) {
    const result = await this.categoriaRepository.findOne({ where: { nombreCategoria: nombre } });
    if (!result) {
      throw new HttpException({ message: 'Categoria no encontrada' }, HttpStatus.NOT_FOUND);
    }
    await this.categoriaRepository.delete({ nombreCategoria: nombre });
  }

}
