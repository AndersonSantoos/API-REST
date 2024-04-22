"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdministratorById = exports.updateAdministratorById = exports.findByEmailAdministrator = exports.getAdministratorById = exports.createAdministrator = void 0;
const Administrator_1 = __importDefault(require("../models/Administrator"));
const createAdministrator = async (nome, cargo, email, senha, isAdmin) => {
    try {
        return await Administrator_1.default.create({ nome, cargo, email, senha, isAdmin });
    }
    catch (error) {
        console.error('Error creatind administrator', error);
        throw error;
    }
};
exports.createAdministrator = createAdministrator;
const getAdministratorById = async (id) => {
    try {
        const administrator = await Administrator_1.default.findByPk(id);
        return administrator;
    }
    catch (error) {
        throw new Error('Error while fetching user by ID');
    }
};
exports.getAdministratorById = getAdministratorById;
const findByEmailAdministrator = async (email) => {
    try {
        return await Administrator_1.default.findOne({ where: { email } });
    }
    catch (error) {
        console.error('Error finding administrator', error);
        throw error;
    }
};
exports.findByEmailAdministrator = findByEmailAdministrator;
const updateAdministratorById = async (id, newData) => {
    try {
        const administrator = await Administrator_1.default.findByPk(id);
        if (!administrator) {
            throw new Error('User not found');
        }
        await Administrator_1.default.update(newData, { where: { id: id } });
        return administrator;
    }
    catch (error) {
        throw new Error('Error while updating administrator by ID');
    }
};
exports.updateAdministratorById = updateAdministratorById;
const deleteAdministratorById = async (id) => {
    try {
        const administrator = await Administrator_1.default.findByPk(id);
        if (!administrator) {
            throw new Error('Administrator not found');
        }
        await administrator.destroy();
        return 'Administrator deleted successfully';
    }
    catch (error) {
        throw new Error('Error while deleting administrator by ID');
    }
};
exports.deleteAdministratorById = deleteAdministratorById;
