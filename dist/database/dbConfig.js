"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const logger_1 = __importDefault(require("../logger"));
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
exports.sequelize = sequelize;
sequelize.authenticate()
    .then(() => {
    logger_1.default.info('Connected to the database successfully.');
})
    .catch(err => {
    logger_1.default.error('Unable to connect to the database');
});
