const { json } = require('express');
let todos = require('../models/task.model.js');
const fs = require('fs');

if (fs.existsSync('TaskFolder') == false) {
    fs.mkdirSync('TaskFolder');
}

// Get all to-dos
const getTodos = (req, res) => {

    if (fs.existsSync('./TaskFolder/task.txt') == false) {
        fs.writeFileSync('./TaskFolder/task.txt', JSON.stringify(todos, null, 2) , 'utf-8');
    }

    let result =fs.readFileSync('./TaskFolder/task.txt' , 'utf-8');
    res.json( JSON.parse(result) );
};

// Create a new to-do
const createTodo = (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }
    const newTodo = {
        id: todos.length + 1,
        text
    };
    todos.push(newTodo);
    
    fs.writeFileSync('./TaskFolder/task.txt', JSON.stringify(todos, null, 2) , 'utf-8');

    res.status(201).json(newTodo);
};

// Update a to-do by ID
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const todo = todos.find(t => t.id == id);
    if (todo) {
        todo.text = text || todo.text;
        fs.writeFileSync('./TaskFolder/task.txt', JSON.stringify(todos, null, 2) , 'utf-8');
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

// Delete a to-do by ID
const deleteTodo = (req, res) => {

    let { id } = req.params;
    todos = todos.filter(t => t.id != id);
    fs.writeFileSync('./TaskFolder/task.txt', JSON.stringify(todos, null, 2) , 'utf-8');
    res.status(204).send();  // No content after successful deletion
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
