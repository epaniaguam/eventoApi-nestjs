import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto, UpdateCategoriaDto } from './dto/categoria.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('categoria')
@ApiTags('Categorías')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada con éxito.' })
  @ApiResponse({ status: 409, description: 'La categoría ya existe.' })
  @ApiBody({ type: CreateCategoriaDto })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de todas las categorías recuperada con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findAll() {
    return this.categoriaService.findAll();
  }
  
  @Get(':nombre')
  @ApiOperation({ summary: 'Obtener una categoría por nombre' })
  @ApiResponse({ status: 200, description: 'Categoría recuperada con éxito.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  findOne(@Param('nombre') nombre: string) {
    return this.categoriaService.findOne(nombre);
  }
  
  @Patch(':nombre')
  @ApiOperation({ summary: 'Actualizar una categoría existente' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada con éxito.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiBody({ type: UpdateCategoriaDto })
  update(@Param('nombre') nombre: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(nombre, updateCategoriaDto);
  }
  
  @Delete(':nombre')
  @ApiOperation({ summary: 'Eliminar una categoría por nombre' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada con éxito.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  remove(@Param('nombre') nombre: string) {
    return this.categoriaService.remove(nombre);
  }
}