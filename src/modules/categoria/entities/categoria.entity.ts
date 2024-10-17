import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('categoria')
export class CategoriaEntity {
 @ObjectIdColumn()
  _id: ObjectId;

  @Column('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombreCategoria: string;
}