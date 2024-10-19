import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from './entities/evento.entity';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventoEntity]),CategoriaModule],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}
