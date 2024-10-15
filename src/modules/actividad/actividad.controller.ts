import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Public } from '../auth/decorators/public.decorator';


@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @Public()
  create(@Body() createActividadDto: any) {
    return this.actividadService.create(createActividadDto);
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
