"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePositionController = exports.updatePositionController = exports.findAllPositionController = exports.findByPositionController = exports.registerPositionController = void 0;
const logger_1 = __importDefault(require("../logger"));
const positionRepository_1 = require("../repositories/positionRepository");
const registerPositionController = async (req, res) => {
    try {
        const { position } = req.body;
        if (!position) {
            logger_1.default.error('Position is required');
            return res.status(400).send('Position is required');
        }
        await (0, positionRepository_1.createPosition)(position);
        logger_1.default.info('Registration sucessful');
        res.status(201).send('Registration successful');
    }
    catch (error) {
        logger_1.default.error('Internal Server Error', error);
        res.status(500).send('Internal Server Error');
    }
};
exports.registerPositionController = registerPositionController;
const findByPositionController = async (req, res) => {
    try {
        const { position } = req.params;
        const foundPosition = await (0, positionRepository_1.findByPosition)(position);
        if (!foundPosition) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.status(200).json(foundPosition);
    }
    catch (error) {
        logger_1.default.error('Error finding position:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.findByPositionController = findByPositionController;
const findAllPositionController = async (req, res) => {
    try {
        const allPosition = await (0, positionRepository_1.findAllPosition)();
        res.status(200).json(allPosition);
    }
    catch (error) {
        logger_1.default.error('Error finding all positions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.findAllPositionController = findAllPositionController;
const updatePositionController = async (req, res) => {
    try {
        const { positionId } = req.params;
        const newPositionName = req.body.position;
        await (0, positionRepository_1.updatePosition)(parseInt(positionId), newPositionName);
        res.status(200).json({ message: 'Position updated successfully' });
    }
    catch (error) {
        logger_1.default.error('Error updating position', error);
        res.status(500).json({ message: 'Error updating position' });
    }
};
exports.updatePositionController = updatePositionController;
const deletePositionController = async (req, res) => {
    try {
        const { positionId } = req.params;
        await (0, positionRepository_1.deletePosition)(parseInt(positionId));
        res.status(200).json({ message: 'Position deleted successfully' });
    }
    catch (error) {
        logger_1.default.error('Error deleting position:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deletePositionController = deletePositionController;
