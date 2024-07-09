"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    console.log('Hello my friend');
    res.send('Hello World!');
});
app.use(auth_router_1.default);
app.use('/api', user_router_1.default);
app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on http://localhost:${PORT}`);
});
