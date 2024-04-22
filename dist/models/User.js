"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// User.ts
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const Position_1 = __importDefault(require("./Position"));
class User extends sequelize_1.Model {
    // Método para evitar que o campo password seja excluído nos resultados JSON
    toJSON() {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    positionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Position',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    apiKey: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'users',
});
// Define a associação entre User e Position
User.belongsTo(Position_1.default, { foreignKey: 'positionId', as: 'position' });
exports.default = User;
