import { Sequelize } from "sequelize-typescript";
import { Quiz } from "./quiz.model";
import { Question } from "./question.model";
import { Option } from "./option.model";
import { QuestionType } from "./questionType.model";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: [Quiz, Question, Option, QuestionType],
  logging: false,
});

export default sequelize;
