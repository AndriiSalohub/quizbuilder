"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const quiz_model_1 = require("./quiz.model");
const question_model_1 = require("./question.model");
const option_model_1 = require("./option.model");
const questionType_model_1 = require("./questionType.model");
const sequelize = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    models: [quiz_model_1.Quiz, question_model_1.Question, option_model_1.Option, questionType_model_1.QuestionType],
    logging: false,
});
exports.default = sequelize;
