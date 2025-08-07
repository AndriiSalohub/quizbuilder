import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Question, QuestionCreationAttributes } from "./question.model";

export interface QuizAttributes {
  id?: number;
  title: string;
  questions?: Question[];
}

export interface QuizCreationAttributes {
  title: string;
  questions?: QuestionCreationAttributes[];
}

@Table({ tableName: "quizzes" })
export class Quiz extends Model<QuizAttributes, QuizCreationAttributes> {
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
  title!: string;

  @HasMany(() => Question)
  questions!: Question[];
}
