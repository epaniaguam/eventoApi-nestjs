import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, UpdateAuthDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiBody({ type: CreateAuthDto })
  @ApiOperation({ summary: 'Iniciar sesión en la aplicación' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'No autorizado. Las credenciales son incorrectas.' })
  signin(@Body() signInDto: CreateAuthDto) {
    return this.authService.signin(signInDto.username, signInDto.password);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios recuperados con éxito' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario recuperado con éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar la información de un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 400, description: 'Entrada inválida' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}