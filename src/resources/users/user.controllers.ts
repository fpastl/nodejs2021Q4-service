import User from './user.model';
import routeHandler, { userInterface } from "../../constants/types";
import getAll from './user.service';
import { notFound, removed } from '../../constants/messages';
import { clearTasksUser } from '../tasks/task.controllers';

let users: Promise<User[]> | User[] = getAll();
type userParams = { id: string };

/**
 * Send response with array of Users
 * @param _req request object with information about request
 * @param res reply object to send a response
 */
export const getUsers: routeHandler = async (_req, res) => res.send((await users).map(User.toResponse));

/**
 * Send response if exist User with received id - with User; else - reports failure
 * @param req request object with information about request
 * @param res reply object to send a response 
 */
export const getUser: routeHandler = async (req, res) => {
    const { id } = req.params as userParams;
    const item = (await users).find(user => user.id === id);
    if (!item) res.code(404).send(notFound('user', id));
    res.send(item);
};

/**
 * Create new object User with datas in received body into array and send new object 
 * @param req request object with information about request
 * @param res reply object to send a response 
 */
export const postUser: routeHandler = async (req, res) => {
    const newUser = new User(req.body as userParams);
    (await users).push(newUser);
    res.code(201).send(User.toResponse(newUser));
};

/**
 * if exist User with received id - Rewrite object User and send this object; else - reports failure
 * @param req request object with information about request
 * @param res reply object to send a response 
 */
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

/**
 * delete object User with received id from array
 * @param req request object with information about request
 * @param res reply object to send a response 
 */
export const deleteUser: routeHandler = async (req, res) => {
    const { id } = req.params as userParams;
    users = (await users).filter(user => user.id !== id);
    await clearTasksUser(id);
    res.send(removed('user', id));
}