const { Schema, model } = require('mongoose')

//Defining Collection for MongoDB
const TodoListSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const TodoList = model('TodoListItems', TodoListSchema)

module.exports = TodoList
