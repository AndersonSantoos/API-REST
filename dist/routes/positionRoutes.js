"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Rotas de posições (positions)
const express_1 = __importDefault(require("express"));
const positionController_1 = require("../controllers/positionController");
const middlewareAdm_1 = require("../middleware/middlewareAdm");
const router = express_1.default.Router();
// Rota para registrar uma nova posição (apenas administradores podem acessar)
router.post('/registerPosition', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        await (0, positionController_1.registerPositionController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
// Rota para buscar uma posição única (apenas administradores podem acessar)
router.get('/getUnique', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        await (0, positionController_1.findByPositionController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
// Rota para buscar todas as posições (apenas administradores podem acessar)
router.get('/getAny', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        await (0, positionController_1.findAllPositionController)(req, res);
    }
    catch (error) {
        console.log('Error in route', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Rota para atualizar uma posição por ID (apenas administradores podem acessar)
router.put('/:positionId', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        await (0, positionController_1.updatePositionController)(req, res);
    }
    catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Rota para excluir uma posição por ID (apenas administradores podem acessar)
router.delete('/:positionId', middlewareAdm_1.authenticateAdmin, async (req, res) => {
    try {
        await (0, positionController_1.deletePositionController)(req, res);
    }
    catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
