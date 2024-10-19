import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('evento')
export class EventoEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombreEvento: string;
  
  @Column({ type: 'varchar', length: 200 })
  descripcion: string;
  
  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'varchar', length: 100 })
  lugar: string;

  @Column({ type: 'uuid'})
  categoriaId: string;
  
  // @Column()
  // categoriaId: ObjectId;
}