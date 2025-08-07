"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const quiz_model_1 = require("./quiz.model");
const questionType_model_1 = require("./questionType.model");
const option_model_1 = require("./option.model");
let Question = class Question extends sequelize_typescript_1.Model {
};
exports.Question = Question;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => quiz_model_1.Quiz),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Question.prototype, "quizId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => questionType_model_1.QuestionType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Question.prototype, "typeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => quiz_model_1.Quiz),
    __metadata("design:type", quiz_model_1.Quiz)
], Question.prototype, "quiz", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => questionType_model_1.QuestionType),
    __metadata("design:type", questionType_model_1.QuestionType)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => option_model_1.Option),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
exports.Question = Question = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "questions" })
], Question);
