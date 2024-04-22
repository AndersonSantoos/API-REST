"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.status(401).send('Access token not provided');
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error decoding token:', err);
            return res.status(403).send('Invalid token');
        }
        if (!decoded.email || !decoded.positionId) {
            console.error('Token is missing required information');
            return res.status(403).send('Invalid token');
        }
        req.user = { email: decoded.email, positionId: decoded.positionId };
        next();
    });
};
exports.authenticateToken = authenticateToken;
