import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('ventas')
export class VentaEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('uuid')
  id: string;

  @Column({ type: 'uuid'})
  usuarioId: string; 

  @Column({ type: 'uuid'})
  clienteId: string;

  @Column({ type: 'uuid'})
  eventoId: string;

  @Column({ type: 'date' })
  fechaVenta: Date;

  @Column({ type: 'number' })
  precio: number;
}