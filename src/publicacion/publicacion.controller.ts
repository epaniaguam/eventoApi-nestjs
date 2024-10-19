import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto, UpdatePublicacionDto } from './dto/publicacion.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('publicacion')
@ApiTags('Publicaciones')
@Public()
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

  @Get('detailed')
  @ApiOperation({ summary: 'Obtener todas las publicaciones detallado' })
  @ApiResponse({ status: 200, description: 'Lista de todas las publicaciones recuperada con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findAllDetailed() {

    return this.publicacionService.findAllDetailed();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una publicación por UUID' })
  @ApiResponse({ status: 200, description: 'Publicación recuperada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  findById(@Param('id') id: string) {
    return this.publicacionService.findById(id);
  }
  
  @Get('nombre/:nombre')
  @ApiOperation({ summary: 'Obtener una publicación por nombre' })
  @ApiResponse({ status: 200, description: 'Publicación recuperada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  findByName(@Param('nombre') nombre: string) {
    return this.publicacionService.findByName(nombre);
  }

  @Patch('nombre/:nombre')
  @ApiOperation({ summary: 'Actualizar una publicación existente' })
  @ApiResponse({ status: 200, description: 'Publicación actualizada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiBody({ type: UpdatePublicacionDto })
  updateByName(@Param('nombre') nombre: string, @Body() updatePublicacionDto: UpdatePublicacionDto) {
    return this.publicacionService.updateByName(nombre, updatePublicacionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una publicación existente' })
  @ApiResponse({ status: 200, description: 'Publicación actualizada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiBody({ type: UpdatePublicacionDto })
  updateById(@Param('id') id: string, @Body() updatePublicacionDto: UpdatePublicacionDto) {
    return this.publicacionService.updateById(id, updatePublicacionDto);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una publicación por ID' })
  @ApiResponse({ status: 200, description: 'Publicación eliminada con éxito.' })
  @ApiResponse({ status: 404, description: 'Publicación no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  removeById(@Param('id') id: string) {
    return this.publicacionService.removeById(id);
  }
}