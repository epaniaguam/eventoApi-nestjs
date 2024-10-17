import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { VentasEntity } from 'src/entities/ventas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoService } from './servicesAux/evento.service';
import { EventoEntity } from 'src/entities/evento.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { CategoriaModule } from '../categoria/categoria.module';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([
      VentasEntity,
      EventoEntity,
    ]),
    UsuarioModule,
    CategoriaModule,
    ClienteModule
  ],
  controllers: [ActividadController],
  providers: [
    ActividadService,
    EventoService,
  ],
})
export class ActividadModule {}
