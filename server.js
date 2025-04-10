const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if necessary
    password: '', // Change if necessary
    database: 'tododata'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Get all tasks
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM datatable', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO datatable (task) VALUES (?)', [task], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, task });
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    db.query('UPDATE datatable SET task = ? WHERE id = ?', [task, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task updated' });
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM datatable WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task deleted' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
