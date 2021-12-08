import Task from './task.model';
import getAll from './task.service';
import { notFound, removed } from '../../constants/messages';
import routeHandler, { taskInterface } from "../../constants/types";

type taskIdParam = { taskId: string };
type taskBoardIdParam = { boardId: string };

let tasks: Promise<Task[]> | Task[] = getAll();

export const getTasks: routeHandler = async (req, res) => {
    const { boardId } = req.params as taskBoardIdParam;
    const boardTasks = (await tasks).filter(task => task.boardId === boardId);
    res.send(boardTasks.map(Task.toResponse))
};

export const getTask: routeHandler = async (req, res) => {
    const { taskId } = req.params as taskIdParam;
    const item = (await tasks).find(task => task.id === taskId);
    if (!item) res.code(404).send(notFound('task', taskId as string));
    res.send(item);
};

export const postTask: routeHandler = async (req, res) => {
    const { boardId } = req.params as taskInterface;
    const newTask = new Task(req.body as taskInterface);
    newTask.boardId = boardId;
    (await tasks).push(newTask);
    res.code(201).send(Task.toResponse(newTask));
};

export const putTask: routeHandler = async (req, res) => {
    const { taskId } = req.params as taskIdParam;
    const { title, order, description, userId, columnId } = req.body as taskInterface;
    const item = (await tasks).find(task => task.id === taskId);
    if (!item) res.code(404).send(notFound('task', taskId));
    else {
        item.title = title;
        item.order = order;
        item.description = description;
        item.userId = userId;
        item.columnId = columnId;
        res.send(Task.toResponse(item));
    }

};

export const deleteTask: routeHandler = async (req, res) => {
    const { taskId } = req.params as taskIdParam;
    tasks = (await tasks).filter(task => task.id !== taskId);
    res.send(removed('task', taskId));
}

export const deleteBoardsTasks = async (boardId: string) => {
    tasks = (await tasks).filter(item => item.boardId !== boardId);
}

export const clearTasksUser = async (delUserId: string) => {
    tasks = (await tasks).map(((item: Task) => {
        const newItem: Task = Object.assign(item);
        if (newItem.userId === delUserId) newItem.userId = null;
        return newItem;
    }));
}