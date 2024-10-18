import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('cliente')
export class ClienteEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  edad: number;

}
