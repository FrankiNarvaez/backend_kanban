import { userModel } from '../models/user.model.js'

// get Users of the database
const getUsers = async (req, res) => {
  try {
    console.log(req.user_id)
    const users = await userModel.getUsers()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while getting users'
    })
  }
}
// get a User of the database
const getUser = async (req, res) => {
  try {
    const user = await userModel.getUser(req.params.id)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while getting user'
    })
  }
}
// get a User's Sections of the database
const getSections = async (req, res) => {
  try {
    const sections = await userModel.getSections(req.params.id)
    res.json(sections)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while getting sections'
    })
  }
}
// get a User's Section of the database
const getSection = async (req, res) => {
  try {
    const section = await userModel.getSection(req.params.sectionId)
    res.json(section)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while getting section'
    })
  }
}
// get a User's Section's Tasks of the database
const getTasks = async (req, res) => {
  try {
    const tasks = await userModel.getTasks(req.params.id, req.params.sectionId)
    res.json(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while getting tasks'
    })
  }
}
// get a User's Section's Task of the database
const getTask = async (req, res) => {
  try {
    const task = await userModel.getTask(req.params.taskId)
    res.json(task)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while getting task'
    })
  }
}
// create a Section in the database related to a User
const createSection = async (req, res) => {
  try {
    const section = await userModel.createSection({
      userId: req.params.id,
      sectionName: req.body.sectionName
    })
    res.json(section)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while creating section'
    })
  }
}
// create a Task in the database related to a Section
const createTask = async (req, res) => {
  try {
    const task = await userModel.createTask({
      sectionId: req.params.sectionId,
      taskName: req.body.taskName
    })
    res.json(task)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while creating task'
    })
  }
}

// Delete a Section from the database
const deleteSection = async (req, res) => {
  try {
    await userModel.deleteSection(req.params.sectionId)
    res.json({
      message: 'Section deleted successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while deleting section'
    })
  }
}

// Delete a Task from the database
const deleteTask = async (req, res) => {
  try {
    await userModel.deleteTask(req.params.taskId)
    res.json({
      message: 'Task deleted successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while deleting task'
    })
  }
}

// Update a section_name of the database
const updateNameSection = async (req, res) => {
  try {
    await userModel.updateNameSection(req.params.sectionId, req.body.sectionName)
    res.json({
      message: 'Section updated successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while updating section'
    })
  }
}

// Update a task_name of the database
const updateNameTask = async (req, res) => {
  try {
    await userModel.updateNameTask(req.params.taskId, req.body.taskName)
    res.json({
      message: 'Task updated successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while updating task'
    })
  }
}

// Update a section_id of the task in the database
const updateSectionIdTask = async (req, res) => {
  try {
    await userModel.updateSectionIdTask(req.params.taskId, req.body.sectionId)
    res.json({
      message: 'Task updated successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while updating task'
    })
  }
}

export const userController = {
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
}
