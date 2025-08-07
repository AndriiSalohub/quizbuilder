import { Table, Column, Model, DataType } from "sequelize-typescript";

export interface QuestionTypeAttributes {
  id?: number;
  name: string;
}

export interface QuestionTypeCreationAttributes {
  name: string;
}

@Table({ tableName: "question_types" })
export class QuestionType extends Model<QuestionTypeAttributes, QuestionTypeCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}
