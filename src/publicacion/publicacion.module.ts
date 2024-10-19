import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { PublicacionEntity } from './entities/publicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from 'src/evento/entities/evento.entity';
import { CategoriaModule } from '../categoria/categoria.module';
import { EventoModule } from 'src/evento/evento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PublicacionEntity,
      EventoEntity,
    ]),
    CategoriaModule,
    EventoModule
  ],
  controllers: [PublicacionController],
  providers: [
    PublicacionService,
    ],
})
export class PublicacionModule {}
