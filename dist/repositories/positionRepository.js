"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosition = exports.updatePosition = exports.findAllPosition = exports.findByPosition = exports.createPosition = void 0;
const Position_1 = __importDefault(require("../models/Position"));
const createPosition = async (position) => {
    try {
        return await Position_1.default.create({ position });
    }
    catch (error) {
        console.error('Error creating position');
        throw error;
    }
};
exports.createPosition = createPosition;
const findByPosition = async (position) => {
    try {
        return await Position_1.default.findOne({ where: { position } });
    }
    catch (error) {
        console.log('Error finding position');
        throw error;
    }
};
exports.findByPosition = findByPosition;
const findAllPosition = async () => {
    try {
        return await Position_1.default.findAll();
    }
    catch (error) {
        console.log('Erro ao encontrar todos os cargos');
        throw error;
    }
};
exports.findAllPosition = findAllPosition;
const updatePosition = async (positionId, newPositionName) => {
    try {
        const position = await Position_1.default.findByPk(positionId);
        if (!position) {
            throw new Error('Position not found');
        }
        position.position = newPositionName;
        return await position.save();
    }
    catch (error) {
        console.error('Error updating position');
        throw error;
    }
};
exports.updatePosition = updatePosition;
const deletePosition = async (positionId) => {
    try {
        const position = await Position_1.default.findByPk(positionId);
        if (!position) {
            throw new Error('Position not found');
        }
        return await position.destroy();
    }
    catch (error) {
        console.error('Error deleting position');
        throw error;
    }
};
exports.deletePosition = deletePosition;
