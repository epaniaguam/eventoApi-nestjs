import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';


@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  create(@Body() createActividadDto: any) {
    return this.actividadService.create(createActividadDto);
  }

  @Get()
  findAll() {
    return this.actividadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActividadDto: any) {
    return this.actividadService.update(+id, updateActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadService.remove(+id);
  }
}
