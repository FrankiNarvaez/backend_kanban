"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
// import { verifyToken } from '../middlewares/jwt.middleware'
const router = (0, express_1.Router)();
router.post('/register', auth_controller_1.AuthController.register);
router.post('/login', auth_controller_1.AuthController.login);
router.post('logout', auth_controller_1.AuthController.logout);
// router.get('/kanban', verifyToken, AuthController.kanban)
exports.default = router;
