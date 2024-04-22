"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceRequest = exports.updateServiceRequest = exports.getAllServiceRequests = exports.createServiceRequest = void 0;
// repositories/serviceRequestRepository.ts
const logger_1 = __importDefault(require("../logger"));
const serviceRequest_1 = __importDefault(require("../models/serviceRequest"));
const createServiceRequest = async (descricao, userId, positionId, email) => {
    try {
        return await serviceRequest_1.default.create({ descricao, solicitacaoServico: descricao, userId, positionId, email });
    }
    catch (error) {
        logger_1.default.error('Error creating service request:', error);
        throw error;
    }
};
exports.createServiceRequest = createServiceRequest;
const getAllServiceRequests = async () => {
    try {
        return await serviceRequest_1.default.findAll();
    }
    catch (error) {
        logger_1.default.error('Error fetching service requests:', error);
        throw error;
    }
};
exports.getAllServiceRequests = getAllServiceRequests;
const updateServiceRequest = async (id, solicitacaoServico) => {
    try {
        const serviceRequest = await serviceRequest_1.default.findByPk(id);
        if (!serviceRequest) {
            throw new Error('Service request not found');
        }
        serviceRequest.solicitacaoServico = solicitacaoServico;
        await serviceRequest.save();
        return serviceRequest;
    }
    catch (error) {
        logger_1.default.error('Error updating service request:', error);
        throw error;
    }
};
exports.updateServiceRequest = updateServiceRequest;
const deleteServiceRequest = async (id) => {
    try {
        const serviceRequest = await serviceRequest_1.default.findByPk(id);
        if (!serviceRequest) {
            throw new Error('Service request not found');
        }
        await serviceRequest.destroy();
        return { message: 'Service request deleted successfully' };
    }
    catch (error) {
        logger_1.default.error('Error deleting service request:', error);
        throw error;
    }
};
exports.deleteServiceRequest = deleteServiceRequest;
