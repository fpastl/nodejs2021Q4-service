import User from './user.model';
import routeHandler, { userInterface } from "../../constants/types";
import getAll from './user.service';
import { notFound, removed } from '../../constants/messages';
import { clearTasksUser } from '../tasks/task.controllers';

let users: Promise<User[]> | User[] = getAll();
type userParams = { id: string };

export const getUsers: routeHandler = async (_req, res) => res.send((await users).map(User.toResponse));

export const getUser: routeHandler = async (req, res) => {
    const { id } = req.params as userParams;
    const item = (await users).find(user => user.id === id);
    if (!item) res.code(404).send(notFound('user', id));
    res.send(item);
};

export const postUser: routeHandler = async (req, res) => {
    const newUser = new User(req.body as userParams);
    (await users).push(newUser);
    res.code(201).send(User.toResponse(newUser));
};

export const putUser: routeHandler = async (req, res) => {
    const { id } = req.params as userParams;
    const { name, login, password } = req.body as userInterface;
    const item = (await users).find(user => user.id === id);
    if (!item) res.code(404).send(notFound('user', id));
    else {
        item.name = name;
        item.login = login;
        item.password = password;
        res.send(User.toResponse(item));
    }
};

export const deleteUser: routeHandler = async (req, res) => {
    const { id } = req.params as userParams;
    users = (await users).filter(user => user.id !== id);
    await clearTasksUser(id);
    res.send(removed('user', id));
}