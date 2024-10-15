import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Public } from '../auth/decorators/public.decorator';
import { RegistrarVentaDto } from 'src/dto/venta.dto';


@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @Public()
  create(@Body() ventaDto: RegistrarVentaDto) {
    return this.actividadService.create(ventaDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.actividadService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.actividadService.findOne(id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateActividadDto: any) {
    return this.actividadService.update(+id, updateActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadService.remove(+id);
  }
}
