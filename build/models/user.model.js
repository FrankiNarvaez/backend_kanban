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
exports.userModel = void 0;
const connection_database_1 = require("../database/connection.database");
// Get all users from the database
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query('SELECT * FROM users');
    return rows;
});
// Get a user from the database
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return rows[0];
});
// Get a user's sections from the database
const getSections = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query(`SELECT section.section_id, section.section_name, users.user_name
    FROM section
    JOIN users ON section.user_id = users.user_id
    WHERE users.user_id = $1`, [userId]);
    return rows;
});
// Get a user's section from the database
const getSection = (sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query('SELECT * FROM section WHERE section_id = $1', [sectionId]);
    return rows[0];
});
// Get a user's section's tasks from the database
const getTasks = (userId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query(`SELECT tasks.task_id, tasks.description, section.section_name 
    FROM tasks 
    JOIN section ON tasks.section_id = section.section_id
    JOIN users ON section.user_id = users.user_id
    WHERE section.section_id = $1 AND users.user_id = $2;`, [sectionId, userId]);
    return rows;
});
// Get a user's section's task from the database
const getTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_database_1.pool.query('SELECT * FROM tasks WHERE task_id = $1', [taskId]);
    return rows[0];
});
// Create a section in the database, on the sections table that is related to a user
const createSection = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, sectionName }) {
    const { rows } = yield connection_database_1.pool.query('INSERT INTO section (user_id, section_name) VALUES ($1, $2) RETURNING *', [userId, sectionName]);
    return rows[0];
});
// Create a task in the database, on the tasks table that is related to a section
const createTask = (_a) => __awaiter(void 0, [_a], void 0, function* ({ sectionId, taskName }) {
    const { rows } = yield connection_database_1.pool.query('INSERT INTO task (section_id, task_name) VALUES ($1, $2) RETURNING *', [sectionId, taskName]);
    return rows[0];
});
// Delete a section from the database
const deleteSection = (sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_database_1.pool.query('DELETE FROM section WHERE section_id = $1', [sectionId]);
});
// Delete a task from the database
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_database_1.pool.query('DELETE FROM tasks WHERE task_id = $1', [taskId]);
});
// Update section_name in the database
const updateNameSection = (sectionId, sectionName) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_database_1.pool.query('UPDATE section SET section_name = $1 WHERE section_id = $2', [sectionName, sectionId]);
});
// Update task_name in the database
const updateNameTask = (taskId, taskName) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_database_1.pool.query('UPDATE tasks SET task_name = $1 WHERE task_id = $2', [taskName, taskId]);
});
// Update section_id of the task in the database
const updateSectionIdTask = (taskId, sectionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_database_1.pool.query('UPDATE tasks SET section_id = $1 WHERE task_id = $2', [sectionId, taskId]);
});
exports.userModel = {
    getUsers,
    getUser,
    getSections,
    getSection,
    getTasks,
    getTask,
    createSection,
    createTask,
    deleteSection,
    deleteTask,
    updateNameSection,
    updateNameTask,
    updateSectionIdTask
};
