import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto,UpdateEventoDto } from './dto/evento.dto';
import { Public } from 'src/modules/auth/decorators/public.decorator';

@Controller('evento')
@Public()
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  createEvento(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.createEvento(createEventoDto);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.eventoService.findOneById(id);
  }

  @Get('nombre/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.eventoService.findOneByName(nombre);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.updateById(id, updateEventoDto);
  }

  @Patch('nombre/:id')
  updateByName(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.updateByName(id, updateEventoDto);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.eventoService.removeById(id);
  }
}
