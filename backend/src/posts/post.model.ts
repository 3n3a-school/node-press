import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column({ defaultValue: true })
  isPublished: boolean;

  @Column({
    type: DataType.TEXT
  })
  content: string;
}