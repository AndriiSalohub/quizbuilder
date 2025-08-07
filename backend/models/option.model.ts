import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Question } from "./question.model";

export interface OptionAttributes {
  id?: number;
  questionId?: number;
  text: string;
  isCorrect: boolean;
  question?: Question;
}

export interface OptionCreationAttributes {
  questionId?: number;
  text: string;
  isCorrect: boolean;
}

@Table({ tableName: "options" })
export class Option extends Model<OptionAttributes, OptionCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER, allowNull: false })
  questionId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isCorrect!: boolean;

  @BelongsTo(() => Question)
  question!: Question;
}
