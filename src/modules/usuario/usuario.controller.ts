import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('usuario')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito.' })
  @ApiResponse({ status: 409, description: 'El usuario ya existe.' })
  @ApiBody({ type: CreateUsuarioDto })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios recuperada con éxito.' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':username')
  @Public()
  @ApiOperation({ summary: 'Obtener un usuario por nombre de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario recuperado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Param('username') username: string) {
    return this.usuarioService.findOneByUsername(username);
  }

  @Patch(':username')
  @Public()
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 409, description: 'Otro usuario con el mismo nombre ya existe.' })
  @ApiBody({ type: UpdateUsuarioDto })
  update(@Param('username') username: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(username, updateUsuarioDto);
  }

  @Delete(':username')
  @Public()
  @ApiOperation({ summary: 'Eliminar un usuario por nombre de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  remove(@Param('username') username: string) {
    return this.usuarioService.remove(username);
  }
}
