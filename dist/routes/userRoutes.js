"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const middlewareAdm_1 = require("../middleware/middlewareAdm");
const router = express_1.default.Router();
// Rota para registrar um novo usuário (apenas administradores podem acessar)
router.post("/register", middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        await (0, userController_1.registerUser)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
// Rota para logar um administrador (apenas administradores podem acessar)
router.post('/login', async (req, res) => {
    try {
        await (0, userController_1.login)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
// Rota para buscar um usuário por ID (apenas administradores podem acessar)
router.get('/users/:userId', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        const user = await (0, userController_1.getUserByIdController)(req, res);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Rota para atualizar um usuário por ID (apenas administradores podem acessar)
router.put('/users/:userId', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        const updateUser = await (0, userController_1.updateUserByIdController)(req, res);
        res.status(200).json(updateUser);
    }
    catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Rota para excluir um usuário por ID (apenas administradores podem acessar)
router.delete('/users/:userId', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        const result = await (0, userController_1.deleteUserByIdController)(req, res);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Error in route:', error);
        res.status(500).json('Internal server error');
    }
});
exports.default = router;
