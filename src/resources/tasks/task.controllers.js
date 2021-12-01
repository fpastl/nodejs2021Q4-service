const Task = require('./task.model');
const tasksService = require('./task.service');

let tasks = tasksService.getAll();

const getTasks = async (req, res) => {
    const { boardId } = req.params;
    const boardTasks = (await tasks).filter(task => task.boardId === boardId);
    res.send(boardTasks.map(Task.toResponse))
};


const getTask = async (req, res) => {
    const { taskId } = req.params;
    const item = (await tasks).find(task => task.id === taskId);
    if(!item) res.code(404).send({message: `task ${taskId} not found`});
    res.send(item);
};

const postTask = async (req, res) => {
    const { boardId } = req.params;
    const newTask = new Task(req.body);
    if(!newTask.boardId) newTask.boardId = boardId;
    (await tasks).push(newTask);
    res.code(201).send(Task.toResponse(newTask));
};

const putTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const item = (await tasks).find(task => task.id === taskId);
    item.title = title;
    item.order = order;
    item.description = description;
    item.userId = userId;
    item.columnId = columnId;
    res.send(Task.toResponse(item));
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    tasks = (await tasks).filter(task => task.id !== taskId);
    res.send({ message: `task ${taskId} has been removed` });
}

const deleteBoardsTasks = async (boardId) => {
    tasks = (await tasks).filter(item => item.boardId !== boardId);
}

const clearTasksUser = async (delUserId) => {
    tasks = (await tasks).map((item => {
        const { userId, ...newItem } = item;
        if (userId === delUserId) newItem.userId = null;
        else newItem.userId = userId;
        return newItem;
    }));
}

module.exports = {
    getTask,
    getTasks,
    deleteTask,
    postTask,
    putTask,
    deleteBoardsTasks,
    clearTasksUser
};