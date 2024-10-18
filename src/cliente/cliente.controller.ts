import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto, UpdateClienteDto } from './dto/cliente.dto';
import { Public } from 'src/modules/auth/decorators/public.decorator';

@Controller('cliente')
@Public()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOneById(id);
  }

  @Get('nombre/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.clienteService.findOneByName(nombre);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.updateById(id, updateClienteDto);
  }

  @Patch('nombre/:nombre')
  updateByName(@Param('nombre') nombre: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.updateByName(nombre, updateClienteDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.removeById(id);
  }

  @Delete('nombre/:nombre')
  removeByName(@Param('nombre') nombre: string) {
    return this.clienteService.removeByName(nombre);
  }

}
