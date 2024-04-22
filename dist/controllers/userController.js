"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAPIKey = exports.login = exports.deleteUserByIdController = exports.updateUserByIdController = exports.getUserByIdController = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../logger"));
const Position_1 = __importDefault(require("../models/Position"));
const userRepository_1 = require("../repositories/userRepository");
// Controlador para registrar um novo usuário
const registerUser = async (req, res) => {
    try {
        const { email, fullName, positionId, password, confirmPassword } = req.body;
        if (!email || !fullName || !positionId || !password || !confirmPassword) {
            logger_1.default.error('All fields are required');
            return res.status(400).send('All fields are required');
        }
        if (password !== confirmPassword) {
            logger_1.default.error('Passwords do not match');
            return res.status(400).send('Passwords do not match');
        }
        // Verifica se o cargo (positionId) fornecido na requisição existe na tabela Position
        const position = await Position_1.default.findByPk(parseInt(positionId)); // Convertendo para número
        if (!position) {
            logger_1.default.error('Position not found');
            return res.status(404).send('Position not found');
        }
        // Agora que temos o cargo válido, criamos o usuário
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await (0, userRepository_1.createUser)(email, fullName, position.id, hashedPassword); // Passa o ID do cargo
        logger_1.default.info('Registration successful');
        res.status(201).send('Registration successful');
    }
    catch (error) {
        logger_1.default.error('Internal Server Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.registerUser = registerUser;
const getUserByIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await (0, userRepository_1.getUserById)(parseInt(userId, 10));
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error in getUserByIdController', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserByIdController = getUserByIdController;
const updateUserByIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        const newData = req.body;
        const updateUser = await (0, userRepository_1.updateUserById)(parseInt(userId, 10), newData);
        res.status(200).json(updateUser);
    }
    catch (error) {
        console.error('Error in updateUserByIdController', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateUserByIdController = updateUserByIdController;
const deleteUserByIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await (0, userRepository_1.deleteUserById)(parseInt(userId, 10));
        return result; // retornar o resultado para ser tratado na rota
    }
    catch (error) {
        console.error('Error in deleteUserByIdController:', error);
        throw new Error('Error while deleting user by ID');
    }
};
exports.deleteUserByIdController = deleteUserByIdController;
// Controlador para fazer login
const login = async (req, res) => {
    try {
        const { email, password, positionId } = req.body;
        if (!email || !password || !positionId) {
            logger_1.default.error('Email, password, and positionId are required');
            return res.status(400).send('Email, password, and positionId are required');
        }
        const user = await (0, userRepository_1.findByEmailAndPosition)(email, parseInt(positionId)); // Convertendo para número
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            logger_1.default.error('Invalid credentials');
            return res.status(401).send('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, positionId: user.positionId }, process.env.JWT_SECRET);
        req.session.token = token;
        logger_1.default.info('Login successful');
        res.status(200).send('Login successful');
    }
    catch (error) {
        logger_1.default.error('Internal Server Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.login = login;
// Controlador para gerar uma chave de API
const generateAPIKey = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            console.error('Invalid user data');
            return res.status(403).send('Invalid user data');
        }
        const user = await (0, userRepository_1.findByEmail)(req.user.email); // Busca o usuário pelo email
        if (!user) {
            console.error('User not found');
            return res.status(404).send('User not found');
        }
        if (!user.positionId) { // Verifica se positionId está presente no usuário
            console.error('PositionId not found');
            return res.status(400).send('PositionId not found');
        }
        if (user.apiKey) {
            console.error('User already has an API key');
            return res.status(400).send('User already has an API key');
        }
        const apiKey = generateAPIKeyIfNeeded();
        await (0, userRepository_1.getAPIKey)(user.id, apiKey); // Passa o ID do usuário
        res.json({ apiKey });
    }
    catch (error) {
        console.error('Error generating API key:', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.generateAPIKey = generateAPIKey;
// Função para gerar uma chave de API aleatória, caso necessário
const generateAPIKeyIfNeeded = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    let apiKey = '';
    for (let i = 0; i < length; i++) {
        apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
};
