"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceRequestController = exports.updateServiceRequestController = exports.getAllServiceRequests = exports.openServiceRequest = void 0;
const logger_1 = __importDefault(require("../logger"));
const serviceRequestRepository = __importStar(require("../repositories/serviceRequestRepository"));
const userRepository_1 = require("../repositories/userRepository");
const rolesWithPermissionToCreate = [1, 2]; // Lista de cargos permitidos representados como números
const openServiceRequest = async (req, res) => {
    try {
        const { descricao } = req.body;
        const user = req.user;
        // Verificar se o usuário está autenticado
        if (!user || !user.email || !user.positionId) {
            return res.status(401).send("Unauthorized");
        }
        const { email, positionId } = user;
        // Verificar se o positionId do usuário está na lista de cargos permitidos para criar solicitações
        if (!positionId || !rolesWithPermissionToCreate.includes(positionId)) {
            logger_1.default.info("PositionId do usuário:", positionId);
            return res
                .status(403)
                .send("User is not allowed to create service requests");
        }
        // Buscar o usuário pelo email e positionId para garantir que ele existe e tem permissões adequadas
        const foundUser = await (0, userRepository_1.findByEmailAndPosition)(email, positionId);
        if (!foundUser) {
            return res.status(404).send("User not found");
        }
        await serviceRequestRepository.createServiceRequest(descricao, foundUser.id, positionId, email);
        res.status(201).send("Service request created successfully");
    }
    catch (error) {
        logger_1.default.error("Error opening service request:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.openServiceRequest = openServiceRequest;
const getAllServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await serviceRequestRepository.getAllServiceRequests();
        res.json(serviceRequests);
    }
    catch (error) {
        logger_1.default.error("Error fetching service requests:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getAllServiceRequests = getAllServiceRequests;
const updateServiceRequestController = async (req, res) => {
    const { id } = req.params;
    const { solicitacaoServico } = req.body;
    try {
        const updatedServiceRequest = await serviceRequestRepository.updateServiceRequest(parseInt(id), solicitacaoServico);
        return res.status(200).json(updatedServiceRequest);
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to update service request" });
    }
};
exports.updateServiceRequestController = updateServiceRequestController;
const deleteServiceRequestController = async (req, res) => {
    const { id } = req.params;
    try {
        await serviceRequestRepository.deleteServiceRequest(parseInt(id));
        return res
            .status(200)
            .json({ message: "Service request deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to delete service request" });
    }
};
exports.deleteServiceRequestController = deleteServiceRequestController;
