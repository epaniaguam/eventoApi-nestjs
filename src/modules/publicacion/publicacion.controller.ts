import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto, UpdatePublicacionDto } from './dto/publicacion.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('publicacion')
@ApiTags('Publicaciones')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiResponse({ status: 201, description: 'Publicación creada con éxito.' })
  @ApiResponse({ status: 409, description: 'La publicación ya existe.' })
  @ApiBody({ type: CreatePublicacionDto })
  create(@Body() createPublicacionDto: CreatePublicacionDto) {
    return this.publicacionService.create(createPublicacionDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Obtener todas las publicaciones' })
  @ApiResponse({ status: 200, description: 'Lista de todas las publicaciones recuperada con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findAll() {
    return this.publicacionService.findAll();
  }
  
  @Get(':nombre')
  @ApiOperation({ summary: 'Obtener una publicación por nombre' })
  @ApiResponse({ status: 200, description: 'Publicación recuperada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  findOne(@Param('nombre') nombre: string) {
    return this.publicacionService.findOne(nombre);
  }
  
  @Patch(':nombre')
  @ApiOperation({ summary: 'Actualizar una publicación existente' })
  @ApiResponse({ status: 200, description: 'Publicación actualizada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiBody({ type: UpdatePublicacionDto })
  update(@Param('nombre') nombre: string, @Body() updatePublicacionDto: UpdatePublicacionDto) {
    return this.publicacionService.update(nombre, updatePublicacionDto);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una publicación por ID' })
  @ApiResponse({ status: 200, description: 'Publicación eliminada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(id);
  }
}