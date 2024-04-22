"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Administrator_1 = __importDefault(require("../models/Administrator"));
const authenticateAdmin = async (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.status(403).send('Unauthorized');
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const administrator = await Administrator_1.default.findOne({ where: { email: decodedToken.email } });
        if (!administrator || !administrator.isAdmin) {
            return res.status(403).send('Unauthorized');
        }
        req.administrator = administrator;
        next();
    }
    catch (error) {
        console.error('Error authenticating administrator:', error);
        res.status(500).send('Internal server error');
    }
};
exports.authenticateAdmin = authenticateAdmin;
exports.default = exports.authenticateAdmin;
