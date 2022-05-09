const { Router } = require('express')
const TodoList = require('../../models/TodoList')

const router = Router()

/**
 * @route POST /api/todoListItems
 * @desc Get All Tasks
 */
router.get('/', async (req, res) => {
    try {
        const TodoLists = await TodoList.find()
        if (TodoLists == null) throw new Error('No Todos found in database')
        const list = TodoLists.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        res.status(200).json(list)
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
})

/**
 * @route POST /api/todoListItems
 * @desc Get All Tasks in JSON Format
 */
router.get('/data', async (req, res) => {
    try {
        const TodoLists = await TodoList.find()
        if (!TodoLists) throw new Error('No Todos found in database')
        res.status(200).json(TodoLists)
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
})

/**
 * @route POST /api/todoListItems
 * @desc Add new Task in the Todo list
 */
router.post('/', async (req, res) => {
    const Task = new TodoList(req.body)
    try {
        const todoList = await Task.save()
        res.status(200).json(todoList)
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
})

/**
 * @route POST /api/todoListItems/task_id
 * @desc Update the task in the Todo list
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const UpdatedTask = await TodoList.findByIdAndUpdate(id, req.body)
        if (UpdatedTask == null) throw Error('Something went wrong ')
        const saveit = { ...UpdatedTask._doc, ...req.body }
        res.status(200).json(saveit)
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
})

/**
 * @route POST /api/todoListItems/task_id
 * @desc Dalete the task from Database
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removeTask = await TodoList.findByIdAndDelete(id)
        if (removeTask == null) throw Error('Not able to delete the task.')
        res.status(200).json(removeTask)
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
})

module.exports = router
