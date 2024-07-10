"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("../models/auth.model");
const auth_schema_1 = require("../schemas/auth.schema");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseValidated = (0, auth_schema_1.validateLogin)(req.body);
        const { success, data } = responseValidated;
        if (!success || data === undefined) {
            return res.status(400).json({ error: 'Invalid data' });
        }
        const user = yield auth_model_1.authModel.findUserByEmail(data.email);
        if (user === undefined) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isMatchPassword = bcryptjs_1.default.compareSync(data.password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const secretJWT = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id }, secretJWT, { expiresIn: '5h' });
        return res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }).send({ message: 'Logged in' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseValidated = (0, auth_schema_1.validateRegister)(req.body);
        const { success, data } = responseValidated;
        if (!success || data === undefined || data.username === undefined) {
            return res.status(400).json({ ok: false, message: 'Invalid data' });
        }
        const { username, email, password } = data;
        const user = yield auth_model_1.authModel.findUserByEmail(data.email);
        if (user !== undefined) {
            return res.status(400).json({ ok: false, message: 'Email already exists' });
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        const newUser = yield auth_model_1.authModel.createUser({ username, email, password: hashedPassword });
        const secretJWT = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ user_id: newUser.user_id }, secretJWT, { expiresIn: '5h' });
        return res.status(200).json({ ok: true, message: token });
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: 'Internal server error' });
    }
});
const logout = (_, res) => {
    try {
        return res.clearCookie('access_token').json({ message: 'Logout successful' });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
};
const kanban = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.access_token;
        if (token === undefined) {
            return res.status(401).json({
                ok: false,
                message: 'Unauthorized'
            });
        }
        const user = yield auth_model_1.authModel.findUserById(req.user_id);
        return res.json({
            ok: true,
            message: user.user_id
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
});
exports.AuthController = {
    login,
    register,
    logout,
    kanban
};
