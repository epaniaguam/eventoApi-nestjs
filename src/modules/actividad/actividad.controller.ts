import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Public } from '../auth/decorators/public.decorator';
import { RegistrarVentaDto, UpdateVentaDto } from 'src/dto/venta.dto';


@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  // @Public()
  create(@Body() ventaDto: RegistrarVentaDto) {
    return this.actividadService.create(ventaDto);
  }

  @Get()
  // @Public()
  findAll() {
    return this.actividadService.findAll();
  }

  @Get(':id')
  // @Public()
  findOne(@Param('id') id: string) {
    return this.actividadService.findOne(id);
  }

  @Patch(':id')
  // @Public()
  update(@Param('id') id: string, @Body() updateVenta: UpdateVentaDto) {
    return this.actividadService.update(id, updateVenta);
  }

  @Delete(':id')
  // @Public()
  remove(@Param('id') id: string) {
    return this.actividadService.remove(id);
  }
}
