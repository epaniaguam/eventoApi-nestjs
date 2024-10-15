import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('ventas')
export class VentasEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  usuarioId: ObjectId; 

  @Column()
  clienteId: ObjectId;

  @Column()
  eventoId: ObjectId;

  @Column({ type: 'number' })
  precio: number;
}