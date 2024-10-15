import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto,UpdateCategoriaDto } from './dto/categoria.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  // @Public()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }
  
  @Get()
  // @Public()
  findAll() {
    return this.categoriaService.findAll();
  }
  
  @Get(':nombre')
  // @Public()
  findOne(@Param('nombre') nombre: string) {
    return this.categoriaService.findOne(nombre);
  }
  
  
  @Patch(':nombre')
  // @Public()
  update(@Param('nombre') nombre: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(nombre, updateCategoriaDto);
  }
  
  @Delete(':nombre')
  // @Public()
  remove(@Param('nombre') nombre: string) {
    return this.categoriaService.remove(nombre);
  }
}
