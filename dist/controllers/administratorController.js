"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdministrator = exports.deleteAdministratorByIdController = exports.updateAdministratorByIdController = exports.findByEmailAdministratorController = exports.getAdministratorByIdController = exports.registerAdministrator = void 0;
const Administrator_1 = __importDefault(require("../models/Administrator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const administratorRepository_1 = require("./../repositories/administratorRepository");
const registerAdministrator = async (req, res) => {
    try {
        const { nome, cargo, email, senha, confirmSenha, isAdmin } = req.body;
        if (!nome || !cargo || !email || !senha || !confirmSenha || !isAdmin) {
            console.error('All fields are required');
        }
        if (confirmSenha !== confirmSenha) {
            console.error('Senhas do not match');
            return res.status(400).send('Senhas do not match');
        }
        const hashedSenha = await bcrypt_1.default.hash(senha, 10);
        await (0, administratorRepository_1.createAdministrator)(nome, cargo, email, hashedSenha, isAdmin);
        console.log('Registration successful');
    }
    catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.registerAdministrator = registerAdministrator;
const getAdministratorByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const administrator = await (0, administratorRepository_1.getAdministratorById)(parseInt(id, 10));
        if (!administrator) {
            return res.status(404).send('Administrator not found');
        }
        res.status(200).json(administrator);
    }
    catch (error) {
        console.error('Error in getAdministratorByIdController', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAdministratorByIdController = getAdministratorByIdController;
const findByEmailAdministratorController = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: 'Invalid email parameter' });
        }
        const administrator = await (0, administratorRepository_1.findByEmailAdministrator)(email);
        if (!administrator) {
            return res.status(404).json({ error: 'Administrator not found' });
        }
        res.status(200).json(administrator);
    }
    catch (error) {
        console.error('Error in findByEmailAdministratorController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.findByEmailAdministratorController = findByEmailAdministratorController;
const updateAdministratorByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const administratorId = parseInt(id, 10);
        const newData = req.body;
        const updatedAdministrator = await (0, administratorRepository_1.updateAdministratorById)(administratorId, newData);
        res.status(200).json(updatedAdministrator);
    }
    catch (error) {
        console.error('Error in updateAdministratorByIdController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateAdministratorByIdController = updateAdministratorByIdController;
const deleteAdministratorByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const administratorId = parseInt(id, 10);
        const result = await (0, administratorRepository_1.deleteAdministratorById)(administratorId);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Error in deleteAdministratorByIdController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteAdministratorByIdController = deleteAdministratorByIdController;
const loginAdministrator = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const administrator = await Administrator_1.default.findOne({ where: { email } });
        if (!administrator) {
            return res.status(401).send('Invalid email or password');
        }
        const passwordMatch = await bcrypt_1.default.compare(senha, administrator.senha);
        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({ email: administrator.email, isAdmin: administrator.isAdmin }, process.env.JWT_SECRET);
        req.session.token = token;
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.loginAdministrator = loginAdministrator;
