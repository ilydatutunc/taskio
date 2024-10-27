const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const app = express();

const taskControllers = require("./controllers/taskController");

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome');
});

app.get('/tasks', (req, res) => {
    taskControllers.getTasks(req, res);
});

app.post('/tasks', (req, res) => {
    taskControllers.createTask(req, res);
});

app.put('/tasks/:taskId/:newStatus', (req, res) => {
    taskControllers.updadeTask(req, res);
});

const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Chat server is running on ${PORT}`);
});