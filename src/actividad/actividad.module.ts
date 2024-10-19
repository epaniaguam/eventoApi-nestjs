import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { VentaEntity } from 'src/venta/entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaModule } from 'src/venta/venta.module';

@Module({
  imports: [TypeOrmModule.forFeature([VentaEntity]), VentaModule],
  controllers: [ActividadController],
  providers: [ActividadService],
})
export class ActividadModule {}
