import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/jwt.middleware.js'

const router = Router()
router.use(verifyToken)
// Verbos HTTP

// GET
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUser)
router.get('/users/:id/sections', userController.getSections)
router.get('/users/:id/sections/:sectionId', userController.getSection)
router.get('/users/:id/sections/:sectionId/tasks', userController.getTasks)
router.get('/users/:id/sections/:sectionId/tasks/:taskId', userController.getTask)

// POST
router.post('/users/:id/sections', userController.createSection)
router.post('/users/:id/sections/:sectionId/tasks', userController.createTask)

// DELETE
router.delete('/users/:id/sections/:sectionId', userController.deleteSection)
router.delete('/users/:id/sections/:sectionId/tasks/:taskId', userController.deleteTask)

// PATCH
router.patch('/users/:id/sections/:sectionId', userController.updateNameSection)
router.patch('/users/:id/sections/:sectionId/tasksI/:taskId', userController.updateNameTask)
router.patch('/users/:id/sections/:sectionId/tasksU/:taskId', userController.updateSectionIdTask)

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

export default router
