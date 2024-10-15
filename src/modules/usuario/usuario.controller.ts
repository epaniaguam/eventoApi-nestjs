import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto,UpdateUsuarioDto } from './dto/usuario.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Public()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':username')
  @Public()
  findOne(@Param('username') username: string) {
    return this.usuarioService.findOneByUsername(username);
  }

  @Patch(':username')
  @Public()
  update(@Param('username') username: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(username, updateUsuarioDto);
  }

  @Delete(':username')
  @Public()
  remove(@Param('username') username: string) {
    return this.usuarioService.remove(username);
  }
}
