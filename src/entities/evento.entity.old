import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('evento')
export class EventoEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 100 })
  nombreEvento: string;
  
  @Column({ type: 'varchar', length: 200 })
  descripcion: string;
  
  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'varchar', length: 100 })
  lugar: string;

  @Column()
  categoriaId: ObjectId;

}