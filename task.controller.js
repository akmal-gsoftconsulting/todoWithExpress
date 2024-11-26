let todos = require('./task.model.js');

// Get all to-dos
const getTodos = (req, res) => {
    res.json(todos);
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
    res.status(201).json(newTodo);
};

// Update a to-do by ID
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const todo = todos.find(t => t.id == id);
    if (todo) {
        todo.text = text || todo.text;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

// Delete a to-do by ID
const deleteTodo = (req, res) => {
    
    let { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.status(204).send();  // No content after successful deletion
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
