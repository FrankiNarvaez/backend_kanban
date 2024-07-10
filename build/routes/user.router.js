"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const router = (0, express_1.Router)();
router.use(jwt_middleware_1.verifyToken);
// Verbos HTTP
// GET
router.get('/users', user_controller_1.userController.getUsers);
router.get('/users/:id', user_controller_1.userController.getUser);
router.get('/users/:id/sections', user_controller_1.userController.getSections);
router.get('/users/:id/sections/:sectionId', user_controller_1.userController.getSection);
router.get('/users/:id/sections/:sectionId/tasks', user_controller_1.userController.getTasks);
router.get('/users/:id/sections/:sectionId/tasks/:taskId', user_controller_1.userController.getTask);
// POST
router.post('/users/:id/sections', user_controller_1.userController.createSection);
router.post('/users/:id/sections/:sectionId/tasks', user_controller_1.userController.createTask);
// DELETE
router.delete('/users/:id/sections/:sectionId', user_controller_1.userController.deleteSection);
router.delete('/users/:id/sections/:sectionId/tasks/:taskId', user_controller_1.userController.deleteTask);
// PATCH
router.patch('/users/:id/sections/:sectionId', user_controller_1.userController.updateNameSection);
router.patch('/users/:id/sections/:sectionId/tasksI/:taskId', user_controller_1.userController.updateNameTask);
router.patch('/users/:id/sections/:sectionId/tasksU/:taskId', user_controller_1.userController.updateSectionIdTask);
// Simplified version
// GET
// router.get('/users', userController.getUsers)
// router.get('/user', userController.getUser)
// touter.get('/sections', userController.getSections)
// router.get('/section/:sectionId', userController.getSection)
// router.get('/tasks', userController.getTasks)
// router.get('/task/:taskId', userController.getTask)
// POST
// router.post('/section', userController.createSection)
// router.post('/task', userController.createTask)
// DELETE
// router.delete('/section/:sectionId', userController.deleteSection)
// router.delete('/task/:taskId', userController.deleteTask)
// PATCH
// router.patch('/section/:sectionId', userController.updateNameSection)
// router.patch('/taskN/:taskId', userController.updateNameTask)
// router.patch('/taskI/:taskId', userController.updateSectionIdTask)
exports.default = router;
