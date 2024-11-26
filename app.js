const express = require('express');

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
  } = require('./task.controller.js');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// GET route to fetch all to-dos
app.get('/', getTodos);

// POST route to add a new to-do
app.post('/todos', createTodo);

// PUT route to update a to-do by ID
app.put('/todos/:id', updateTodo);

// DELETE route to remove a to-do by ID
app.delete('/todos/:id', deleteTodo);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
