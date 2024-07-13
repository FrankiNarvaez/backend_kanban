"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretJWT = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token === undefined) {
        return res.status(403).json({
            message: 'Token is required'
        });
    }
    try {
        const { user_id: userId } = jsonwebtoken_1.default.verify(token, secretJWT);
        req.user_id = parseInt(userId);
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: 'Invalid token'
        });
    }
};
exports.verifyToken = verifyToken;
