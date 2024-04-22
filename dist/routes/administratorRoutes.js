"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const administratorController_1 = require("../controllers/administratorController");
const middlewareAdm_1 = require("../middleware/middlewareAdm");
const router = express_1.default.Router();
router.post('/administrators', async (req, res) => {
    try {
        await (0, administratorController_1.registerAdministrator)(req, res);
    }
    catch (error) {
        console.error('Error in registerAdministrator route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/loginAdm', async (req, res) => {
    try {
        await (0, administratorController_1.loginAdministrator)(req, res);
    }
    catch (error) {
        console.error('Error while loginAdministrator', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/administrators/:id', async (req, res) => {
    try {
        await (0, administratorController_1.getAdministratorByIdController)(req, res);
    }
    catch (error) {
        console.error('Error in getAdministratorById route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/administrators', async (req, res) => {
    try {
        await (0, administratorController_1.findByEmailAdministratorController)(req, res);
    }
    catch (error) {
        console.error('Error in findByEmailAdministrator route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/administrators/:id', async (req, res) => {
    try {
        await (0, administratorController_1.updateAdministratorByIdController)(req, res);
    }
    catch (error) {
        console.error('Error in updateAdministratorById route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/administrators/:id', async (req, res) => {
    try {
        await (0, administratorController_1.deleteAdministratorByIdController)(req, res);
    }
    catch (error) {
        console.error('Error in deleteAdministratorById route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Rota protegida para o painel do administrador
router.get("/admin/dashboard", middlewareAdm_1.authenticateAdmin, (req, res) => {
    res.send("Painel do Administrador");
});
exports.default = router;
