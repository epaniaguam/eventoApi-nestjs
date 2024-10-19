import { Injectable } from '@nestjs/common';
import { CreateVentaDto, UpdateVentaDto } from 'src/venta/dto/venta.dto';
import { VentaService } from 'src/venta/venta.service';
@Injectable()
export class ActividadService {

  constructor(
    private ventaService: VentaService,
  ) {}

  async createVenta(venta: CreateVentaDto): Promise<any> {
    return await this.ventaService.create(venta);    
  }
  
  async findAllVentas() {
    return await this.ventaService.findAll();
  }

  async findOneVenta(id: string) {
    return await this.ventaService.findById(id);
  }

  async findOneVentaDetailed(id: string) {
    return await this.ventaService.findByIdDetailed(id);
  }

  async updateVentasById(id: string, updateVenta: UpdateVentaDto): Promise<any> {
    return await this.ventaService.updateById(id, updateVenta);
  }

  async removeVentasById(id: string): Promise<any> {
    return await this.ventaService.removeById(id);
  }

}
