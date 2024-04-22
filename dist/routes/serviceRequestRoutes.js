"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceRequestController_1 = require("../controllers/serviceRequestController");
const Middleware_1 = require("../middleware/Middleware");
const router = express_1.default.Router();
// Rota para abrir uma solicitação de serviço
router.post('/', Middleware_1.authenticateToken, async (req, res) => {
    try {
        await (0, serviceRequestController_1.openServiceRequest)(req, res);
    }
    catch (error) {
        console.error('Error in openServiceRequest route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Rota para obter todas as solicitações de serviço
router.get('/', Middleware_1.authenticateToken, async (req, res) => {
    try {
        await (0, serviceRequestController_1.getAllServiceRequests)(req, res);
    }
    catch (error) {
        console.error('Error getting service request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/service-requests/:id', Middleware_1.authenticateToken, async (req, res) => {
    try {
        await (0, serviceRequestController_1.updateServiceRequestController)(req, res);
    }
    catch (error) {
        console.error('Error in updateServiceRequest route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/service-requests/:id', Middleware_1.authenticateToken, async (req, res) => {
    try {
        await (0, serviceRequestController_1.deleteServiceRequestController)(req, res);
    }
    catch (error) {
        console.error('Error in deleteServiceRequest route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
