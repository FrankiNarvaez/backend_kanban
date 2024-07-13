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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authModel = void 0;
const connection_database_1 = require("../database/connection.database");
// Crear un nuevo usuario en la tabla de usuarios
const createUser = (infoUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = infoUser;
    const { rows } = yield connection_database_1.pool.query('INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING user_id, user_name, email, password', [username, email, password]);
    yield connection_database_1.pool.query('INSERT INTO section (user_id, section_name) VALUES ($1, $2) RETURNING *', [rows[0].user_id, 'To Do']);
    return rows[0];
});
// Encontrar un usuario por email
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
});
// Encontrar un usuario por id
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return rows[0];
});
exports.authModel = {
    createUser,
    findUserByEmail,
    findUserById
};
