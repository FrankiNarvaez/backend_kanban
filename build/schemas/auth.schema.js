"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
const zod_1 = __importDefault(require("zod"));
// import { ResponseValidate } from '../types'
const loginSchema = zod_1.default.object({
    email: zod_1.default.string({
        invalid_type_error: 'Email must be a string',
        required_error: 'Email field is required'
    }).email({
    // invalid_type_error: 'Email must be a valid email address'
    }).max(40),
    password: zod_1.default.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password field is required'
    }).max(255)
});
const registerSchema = zod_1.default.object({
    username: zod_1.default.string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Username field is required'
    }).max(30),
    email: zod_1.default.string({
        invalid_type_error: 'Email must be a string',
        required_error: 'Email field is required'
    }).email({
    // invalid_type_error: 'Email must be a valid email address'
    }).max(40),
    password: zod_1.default.string({
        invalid_type_error: 'Password must be a string',
        required_error: 'Password field is required'
    }).max(255)
});
function validateRegister(body) {
    return registerSchema.safeParse(body);
}
function validateLogin(body) {
    return loginSchema.safeParse(body);
}
