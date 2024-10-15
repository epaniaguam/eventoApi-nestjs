import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Public } from '../auth/decorators/public.decorator';
import { RegistrarVentaDto, UpdateVentaDto } from 'src/dto/venta.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('actividad')
@ApiTags('Actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva venta' })
  @ApiResponse({ status: 201, description: 'Venta registrada con éxito.' })
  @ApiResponse({ status: 409, description: 'Ya existe una venta con el mismo cliente y evento.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiBody({ type: RegistrarVentaDto })
  create(@Body() ventaDto: RegistrarVentaDto) {
    return this.actividadService.create(ventaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ventas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las ventas recuperada con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findAll() {
    return this.actividadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta recuperada con éxito.' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findOne(@Param('id') id: string) {
    return this.actividadService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una venta existente' })
  @ApiResponse({ status: 200, description: 'Venta actualizada con éxito.' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiBody({ type: UpdateVentaDto })
  update(@Param('id') id: string, @Body() updateVenta: UpdateVentaDto) {
    return this.actividadService.update(id, updateVenta);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta eliminada con éxito.' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  remove(@Param('id') id: string) {
    return this.actividadService.remove(id);
  }
}