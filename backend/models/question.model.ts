import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from "sequelize-typescript";
import { Quiz } from "./quiz.model";
import { QuestionType } from "./questionType.model";
import { Option, OptionCreationAttributes } from "./option.model";

export interface QuestionAttributes {
  id?: number;
  quizId?: number;
  typeId: number;
  text: string;
  quiz?: Quiz;
  questionType?: QuestionType;
  options?: Option[];
}

export interface QuestionCreationAttributes {
  quizId?: number;
  typeId: number;
  text: string;
  options?: OptionCreationAttributes[];
}

@Table({ tableName: "questions" })
export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER, allowNull: false })
  quizId!: number;

  @ForeignKey(() => QuestionType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  typeId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text!: string;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @BelongsTo(() => QuestionType)
  questionType!: QuestionType;

  @HasMany(() => Option)
  options!: Option[];
}
