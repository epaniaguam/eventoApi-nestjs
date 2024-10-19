import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Public } from '../auth/decorators/public.decorator';
import { CreateVentaDto, UpdateVentaDto } from 'src/venta/dto/venta.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('actividad')
@ApiTags('Actividades')
@Public()
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post('ventas')
  create(@Body() ventaDto: CreateVentaDto) {
    return this.actividadService.createVenta(ventaDto);
  }

  @Get('ventas')
  findAllVentas() {
    return this.actividadService.findAllVentas();
  }

  @Get('ventas/:id')
  findOneVenta(@Param('id') id: string) {
    return this.actividadService.findOneVenta(id);
  }

  @Get('ventas/detailed/:id')
  findOneDetailed(@Param('id') id: string) {
    return this.actividadService.findOneVentaDetailed(id);
  }

  @Patch('ventas/:id')
  updateVentaById(@Param('id') id: string, @Body() updateVenta: UpdateVentaDto) {
    return this.actividadService.updateVentasById(id, updateVenta);
  }

  @Delete('ventas/:id')
  removeVentasById(@Param('id') id: string) {
    return this.actividadService.removeVentasById(id);
  }
}