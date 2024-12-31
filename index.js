const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

//Database
mongoose.connect('mongodb://localhost:27017/TaskIo')
  .then(() => console.log('MongoDB bağlantısı başarılı!'))
  .catch((err) => console.log('MongoDB bağlantı hatası:', err));


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

app.post('/check-email', (req, res) => {
    profileController.checkEmail(req, res); 
});

app.post('/login', (req, res) => {
    profileController.login(req, res); 
});

app.get('/profiles', (req, res) => {
    profileController.getProfiles(req, res);
});

app.get('/getProfile', (req, res) => {
    profileController.getProfiles(req, res);
});

app.delete('/profiles/:profileId', (req, res) => {
    profileController.deleteProfile(req, res);
});

app.put('/profiles/:profileId', (req, res) => {
    profileController.updateProfile(req, res);
});

//group
const groupController = require("./controllers/groupController");

app.post('/create-group', (req, res) => {
    groupController.createGroup(req, res);
});

app.post('/join-group', (req, res) => {
    groupController.joinGroup(req, res);
});

app.get('/group-users/:groupId', (req, res) => {
    groupController.getGroupUsers(req, res);
});

const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Chat server is running on ${PORT}`);
});