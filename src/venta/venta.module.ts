import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { VentaEntity } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import { ClienteEntity } from 'src/cliente/entities/cliente.entity';
import { EventoEntity } from 'src/evento/entities/evento.entity';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { EventoModule } from 'src/evento/evento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        VentaEntity,
        UsuarioEntity,
        ClienteEntity,
        EventoEntity,
      ]),
      UsuarioModule,
      ClienteModule,
      EventoModule,
  ],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [VentaService],  
})
export class VentaModule {}
