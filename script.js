const API_URL = 'http://localhost:3000/tasks';

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.task}</span>
            <div>
                <button class="edit" onclick="editTask(${task.id}, this)">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id}, this)">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskText })
    });

    if (response.ok) {
        taskInput.value = '';
        fetchTasks();
    }
}

async function editTask(id, button) {
    const li = button.parentElement.parentElement;
    const span = li.querySelector('span');
    const newText = prompt('Edit task:', span.textContent);

    if (newText !== null) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: newText.trim() })
        });
        fetchTasks();
    }
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

document.addEventListener('DOMContentLoaded', fetchTasks);
