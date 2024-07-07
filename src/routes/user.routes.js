import { Router } from 'express'
import { dbController } from '../controllers/user.controller.js'

const router = Router()

// Verbos HTTP

// GET
router.get('/users', dbController.getUsers)
router.get('/users/:id', dbController.getUser)
router.get('/users/:id/sections', dbController.getSections)
router.get('/users/:id/sections/:sectionId', dbController.getSection)
router.get('/users/:id/sections/:sectionId/tasks', dbController.getTasks)
router.get('/users/:id/sections/:sectionId/tasks/:taskId', dbController.getTask)

// POST
router.post('/users/:id/sections', dbController.createSection)
router.post('/users/:id/sections/:sectionId/tasks', dbController.createTask)

// DELETE
router.delete('/users/:id/sections/:sectionId', dbController.deleteSection)
router.delete('/users/:id/sections/:sectionId/tasks/:taskId', dbController.deleteTask)

// PATCH
router.patch('/users/:id/sections/:sectionId', dbController.updateNameSection)
router.patch('/users/:id/sections/:sectionId/tasks/:taskId', dbController.updateNameTask)
router.patch('/users/:id/sections/:sectionId/tasks/:taskId', dbController.updateSectionIdTask)

export default router
