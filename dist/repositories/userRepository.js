"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByEmail = exports.findByEmailAndPosition = exports.getAPIKey = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Position_1 = __importDefault(require("../models/Position"));
const logger_1 = __importDefault(require("../logger"));
const createUser = async (email, fullName, positionId, password) => {
    try {
        return await User_1.default.create({ email, fullName, positionId, password });
    }
    catch (error) {
        logger_1.default.error('Error creating user:', error);
        throw error;
    }
};
exports.createUser = createUser;
const getUserById = async (userId) => {
    try {
        const user = await User_1.default.findByPk(userId);
        return user;
    }
    catch (error) {
        throw new Error('Error while fetching user by ID');
    }
};
exports.getUserById = getUserById;
const updateUserById = async (userId, newData) => {
    try {
        const user = await User_1.default.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await User_1.default.update(newData, { where: { id: userId } });
        return user;
    }
    catch (error) {
        throw new Error('Error while updating user by ID');
    }
};
exports.updateUserById = updateUserById;
const deleteUserById = async (userId) => {
    try {
        const user = await User_1.default.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return 'User deleted successfully';
    }
    catch (error) {
        throw new Error('Error while deleting user by ID');
    }
};
exports.deleteUserById = deleteUserById;
const getAPIKey = async (id, apiKey) => {
    try {
        const user = await User_1.default.findByPk(id);
        if (user) {
            user.apiKey = apiKey;
            await user.save();
        }
        else {
            throw new Error('User not found');
        }
    }
    catch (error) {
        logger_1.default.error('Error updating user API key:', error);
        throw error;
    }
};
exports.getAPIKey = getAPIKey;
const findByEmailAndPosition = async (email, positionId) => {
    try {
        const user = await User_1.default.findOne({
            where: { email, positionId }, // Incluindo o positionId como filtro
            include: [{ model: Position_1.default, as: 'position' }]
        });
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.findByEmailAndPosition = findByEmailAndPosition;
const findByEmail = async (email) => {
    try {
        return await User_1.default.findOne({ where: { email } });
    }
    catch (error) {
        logger_1.default.error('Error finding user:', error);
        throw error;
    }
};
exports.findByEmail = findByEmail;
