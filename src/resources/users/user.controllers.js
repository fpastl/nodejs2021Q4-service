const User = require('./user.model');
const usersService = require('./user.service');
const { clearTasksUser } = require('../tasks/task.controllers');
const { notFound, removed } = require('../../constants/messages');

let users = usersService.getAll();

const getUsers = async (req, res) => res.send((await users).map(User.toResponse));

const getUser = async (req, res) => {
    const { id } = req.params;
    const item = (await users).find(user => user.id === id);
    if (!item) res.code(404).send(notFound('user', id));
    res.send(item);
};

const postUser = async (req, res) => {
    const newUser = new User(req.body);
    (await users).push(newUser);
    res.code(201).send(User.toResponse(newUser));
};

const putUser = async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const item = (await users).find(user => user.id === id);
    if (!item) res.code(404).send(notFound('user', id));
    item.name = name;
    item.login = login;
    item.password = password;
    res.send(User.toResponse(item));
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    users = (await users).filter(user => user.id !== id);
    await clearTasksUser(id);
    res.send(removed('user', id));
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    postUser,
    putUser
};