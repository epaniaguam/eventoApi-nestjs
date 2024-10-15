import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { VentasEntity } from 'src/entities/ventas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './servicesAux/cliente.service';
import { ClienteEntity } from 'src/entities/cliente.entity';
import { EventoService } from './servicesAux/evento.service';
import { EventoEntity } from 'src/entities/evento.entity';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([
      VentasEntity,
      ClienteEntity,
      EventoEntity,
    ]),
    UsuarioModule,
    CategoriaModule,
  ],
  controllers: [ActividadController],
  providers: [
    ActividadService,
    ClienteService,
    EventoService,
  ],
})
export class ActividadModule {}
