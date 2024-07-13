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
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
// get Users of the database
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.userModel.getUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while getting users'
        });
    }
});
// get a User of the database
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const user = yield user_model_1.userModel.getUser(idParams);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while getting user'
        });
    }
});
// get a User's Sections of the database
const getSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const sections = yield user_model_1.userModel.getSections(idParams);
        res.json(sections);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while getting sections'
        });
    }
});
// get a User's Section of the database
const getSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const section = yield user_model_1.userModel.getSection(parseInt(req.params.sectionId));
        res.json(section);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while getting section'
        });
    }
});
// get a User's Section's Tasks of the database
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const tasks = yield user_model_1.userModel.getTasks(idParams, parseInt(req.params.sectionId));
        res.json(tasks);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while getting tasks'
        });
    }
});
// get a User's Section's Task of the database
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const task = yield user_model_1.userModel.getTask(parseInt(req.params.taskId));
        res.json(task);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while getting task'
        });
    }
});
// create a Section in the database related to a User
const createSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const section = yield user_model_1.userModel.createSection({
            userId: idParams,
            sectionName: req.body.sectionName
        });
        res.json(section);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while creating section'
        });
    }
});
// create a Task in the database related to a Section
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        const task = yield user_model_1.userModel.createTask({
            sectionId: parseInt(req.params.sectionId),
            taskName: req.body.taskName
        });
        res.json(task);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while creating task'
        });
    }
});
// Delete a Section from the database
const deleteSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        yield user_model_1.userModel.deleteSection(parseInt(req.params.sectionId));
        res.json({
            message: 'Section deleted successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while deleting section'
        });
    }
});
// Delete a Task from the database
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.send(403).json({
                message: 'Forbidden'
            });
        }
        yield user_model_1.userModel.deleteTask(parseInt(req.params.taskId));
        res.json({
            message: 'Task deleted successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while deleting task'
        });
    }
});
// Update a section_name of the database
const updateNameSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        yield user_model_1.userModel.updateNameSection(parseInt(req.params.sectionId), req.body.sectionName);
        res.json({
            message: 'Section updated successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while updating section'
        });
    }
});
// Update a task_name of the database
const updateNameTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        yield user_model_1.userModel.updateNameTask(parseInt(req.params.taskId), req.body.taskName);
        res.json({
            message: 'Task updated successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while updating task'
        });
    }
});
// Update a section_id of the task in the database
const updateSectionIdTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        yield user_model_1.userModel.updateSectionIdTask(parseInt(req.params.taskId), parseInt(req.params.startIndex), parseInt(req.params.endIndex), req.body.sectionId);
        res.json({
            message: 'Task updated successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred while updating task'
        });
    }
});
const updateUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        yield user_model_1.userModel.updateUserName(idParams, req.body.username);
    }
    catch (error) {
        res.status(500).json({
            message: 'an error ocurred while updating user name'
        });
    }
});
const updateSectionPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idParams = parseInt(req.params.id);
        if (req.user_id !== idParams) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
        yield user_model_1.userModel.updateSectionPosition(req.body.sectionId, req.body.initialPos, req.body.finalPos);
    }
    catch (error) {
        res.status(500).json({
            message: 'an error ocurred while updating section position'
        });
    }
});
exports.userController = {
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
    updateSectionIdTask,
    updateSectionPosition,
    updateUserName
};
