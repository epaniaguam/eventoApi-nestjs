import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto,UpdateCategoriaDto } from './dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.categoriaService.findOne(nombre);
  }


  @Patch(':nombre')
  update(@Param('nombre') nombre: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(nombre, updateCategoriaDto);
  }

  @Delete(':nombre')
  remove(@Param('nombre') nombre: string) {
    return this.categoriaService.remove(nombre);
  }
}
