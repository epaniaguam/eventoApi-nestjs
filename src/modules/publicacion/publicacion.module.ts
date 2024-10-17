import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { PublicacionEntity } from './entities/publicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from 'src/evento/entities/evento.entity';
import { EventoService } from '../actividad/servicesAux/evento.service';
import { CategoriaService } from '../categoria/categoria.service';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PublicacionEntity,
      EventoEntity,
    ]),
    CategoriaModule,  
  ],
  controllers: [PublicacionController],
  providers: [
    PublicacionService,
    EventoService,
    ],
})
export class PublicacionModule {}
