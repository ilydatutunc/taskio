const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());


//task

const taskControllers = require("./controllers/taskController");


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

//message

const { createMessage, getMessages, deleteMessage } = require("./controllers/messageController");


app.post('/messages', createMessage);          
app.get('/messages', getMessages);            
app.delete('/messages/:messageId', deleteMessage); 

//profile

const profileController = require("./controllers/profileController");


app.post('/profiles', (req, res) => {
    profileController.createProfile(req, res);
});

app.get('/profiles', (req, res) => {
    profileController.getProfiles(req, res);
});

app.delete('/profiles/:profileId', (req, res) => {
    profileController.deleteProfile(req, res);
});


const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Chat server is running on ${PORT}`);
});