import { Router } from 'express'
import { userController } from '../controllers/user.controller'
import { verifyToken } from '../middlewares/jwt.middleware'

const router = Router()
router.use(verifyToken)
// Verbos HTTP

// GET
router.get('/users', userController.getUsers as any)
router.get('/users/:id', userController.getUser as any)
router.get('/users/:id/sections', userController.getSections as any)
router.get('/users/:id/sections/:sectionId', userController.getSection as any)
router.get('/users/:id/sections/:sectionId/tasks', userController.getTasks as any)
router.get('/users/:id/sections/:sectionId/tasks/:taskId', userController.getTask as any)

// POST
router.post('/users/:id/sections', userController.createSection as any)
router.post('/users/:id/sections/:sectionId/tasks', userController.createTask as any)

// DELETE
router.delete('/users/:id/sections/:sectionId', userController.deleteSection as any)
router.delete('/users/:id/sections/:sectionId/tasks/:taskId', userController.deleteTask as any)

// PATCH
router.patch('/users/:id/sections/:sectionId', userController.updateNameSection as any)
router.patch('/users/:id/sections/:sectionId/tasksI/:taskId', userController.updateNameTask as any)
router.patch('/users/:id/sections/:sectionId/tasksU/:taskId', userController.updateSectionIdTask as any)
router.patch('/users/updatePosSection', userController.updateSectionPosition as any)

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
