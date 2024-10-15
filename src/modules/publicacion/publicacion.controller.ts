import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto, UpdatePublicacionDto } from './dto/publicacion.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  // @Public()
  create(@Body() createPublicacionDto: CreatePublicacionDto) {
    return this.publicacionService.create(createPublicacionDto);
  }
  
  @Get()
  // @Public()
  findAll() {
    return this.publicacionService.findAll();
  }
  
  @Get(':nombre')
  // @Public()
  findOne(@Param('nombre') nombre: string) {
    return this.publicacionService.findOne(nombre);
  }
  
  @Patch(':nombre')
  // @Public()
  update(@Param('nombre') nombre: string, @Body() updatePublicacionDto: UpdatePublicacionDto) {
    return this.publicacionService.update(nombre, updatePublicacionDto);
  }
  
  @Delete(':id')
  // @Public()
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(id);
  }
}
