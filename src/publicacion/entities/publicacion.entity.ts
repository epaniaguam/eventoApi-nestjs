import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('publicacion')
export class PublicacionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  tituloPublicacion: string;

  @Column({ type: 'varchar', length: 100 })
  lugarPublicacion: string;

  @Column({ type: 'date'})
  fechaPublicacion: Date;

  @Column({ type: 'uuid'})
  eventoId: string;

}
