import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto,UpdateUsuarioDto } from './dto/usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usuarioService.findOne(username);
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(username, updateUsuarioDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usuarioService.remove(username);
  }
}
