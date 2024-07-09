"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
require("dotenv/config");
const connectionString = process.env.DATABASE_URL;
exports.pool = new pg_1.default.Pool({
    allowExitOnIdle: true,
    connectionString
});
