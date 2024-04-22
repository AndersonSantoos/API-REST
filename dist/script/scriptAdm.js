"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const Administrator_1 = __importDefault(require("../models/Administrator"));
const createAdministrators = async () => {
    try {
        const administradores = [
            { nome: 'Administrador 1', cargo: 'Desenvolvedor', email: 'anderson@example.com', senha: 'senha123', isAdmin: true },
            { nome: 'Administrador 2', cargo: 'Diretor', email: 'felipe@example.com', senha: 'senha456', isAdmin: true },
            // Adicione mais administradores conforme necessário
        ];
        // Criptografar as senhas antes de armazená-las no banco de dados
        for (const admin of administradores) {
            const hashedSenha = await bcrypt.hash(admin.senha, 10);
            admin.senha = hashedSenha;
        }
        // Cadastrar os administradores no banco de dados
        await Administrator_1.default.bulkCreate(administradores);
        console.log('Administradores cadastrados com sucesso!');
    }
    catch (error) {
        console.error('Erro ao cadastrar administradores:', error);
    }
};
createAdministrators();
