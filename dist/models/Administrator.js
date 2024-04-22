"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../database/dbConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Administrator extends sequelize_1.Model {
    static async bulkCreateAdministrators(administratorsData) {
        try {
            // Criptografar as senhas antes de armazená-las no banco de dados
            for (const admin of administratorsData) {
                const hashedSenha = await bcrypt_1.default.hash(admin.senha, 10);
                admin.senha = hashedSenha;
            }
            // Cadastrar os administradores no banco de dados
            return await this.bulkCreate(administratorsData);
        }
        catch (error) {
            throw new Error('Erro ao criar administradores em massa: ' + error);
        }
    }
}
Administrator.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false, // Por padrão, um administrador não é um administrador
    },
}, {
    sequelize: dbConfig_1.sequelize,
    tableName: 'administrators',
});
exports.default = Administrator;
