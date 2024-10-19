import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto } from './dto/auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  
  async signin(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usuarioService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Compara la contraseña ingresada con la hasheada almacenada
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Crea el token JWT
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
