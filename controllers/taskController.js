const { v4: uuidv4 } = require('uuid');

const tasks = [];

function createTask (req, res) {
    const body = req.body;

    const newUUID = uuidv4();
    let newTask = {
        id: newUUID,
        title: body.title,
        description: body.description,
        status: "pending"
    };

    tasks.push(newTask);

    res.json({ id: newUUID });
};

function getTasks (req, res) {
    res.json({
        tasks: tasks
    });
};

function updadeTask (req, res) {
    
    console.log('req.params: ', req.params);

    let selectedTaskId = req.params.taskId;
    let selectedNewStatus = req.params.newStatus;

    let selectedTask = tasks.find((task) => task.id == selectedTaskId);
    if(!selectedTask) {
        res.json({ updated: false });
        return;
    }
    selectedTask.status = selectedNewStatus;

    res.json({ updated: true });
};

module.exports = { 
    createTask,
    getTasks,
    updadeTask 
};