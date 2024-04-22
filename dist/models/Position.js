"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
class Position extends sequelize_1.Model {
}
Position.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'position',
});
exports.default = Position;
