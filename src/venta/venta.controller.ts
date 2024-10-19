import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto, UpdateVentaDto } from './dto/venta.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('venta')
@Public()
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.create(createVentaDto);
  }

  @Get()
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ventaService.findById(id);
  }

  @Get('detailed/:id')
  findByIdDetailed(@Param('id') id: string) {
    return this.ventaService.findByIdDetailed(id);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.updateById(id, updateVentaDto);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.ventaService.removeById(id);
  }
}
