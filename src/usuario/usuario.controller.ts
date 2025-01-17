import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('usuario')
@ApiTags('Usuarios')
// @Public()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito.' })
  @ApiResponse({ status: 409, description: 'El usuario ya existe.' })
  @ApiBody({ type: CreateUsuarioDto })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios recuperada con éxito.' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Obtener un usuario por nombre de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario recuperado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findByUsername(@Param('username') username: string) {
    return this.usuarioService.findByUsername(username);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario recuperado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findById(@Param('id') id: string) {
    return this.usuarioService.findById(id);
  }

  @Patch('username/:username')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 409, description: 'Otro usuario con el mismo nombre ya existe.' })
  @ApiBody({ type: UpdateUsuarioDto })
  updateByName(@Param('username') username: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateByName(username, updateUsuarioDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente por ID' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 409, description: 'Otro usuario con el mismo nombre ya existe.' })
  updateById(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateById(id, updateUsuarioDto);
  }

  @Delete('username/:username')
  @ApiOperation({ summary: 'Eliminar un usuario por nombre de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  removeByUsername(@Param('username') username: string) {
    return this.usuarioService.removeByUsername(username);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  removeById(@Param('id') id: string) {
    return this.usuarioService.removeById(id);
  }

}
