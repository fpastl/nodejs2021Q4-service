const Board = require('./board.model');
const boardsService = require('./board.service');
const { deleteBoardsTasks } = require('../tasks/task.controllers');
const { notFound, removed } = require('../../constants/messages');

let boards = boardsService.getAll();

const getBoards = async (req, res) => res.send((await boards).map(Board.toResponse));

const getBoard = async (req, res) => {
    const { id } = req.params;
    const item = (await boards).find(board => board.id === id);
    if (!item) res.code(404).send(notFound('board', id));
    res.send(item);
};

const postBoard = async (req, res) => {
    const newBoard = new Board(req.body);
    (await boards).push(newBoard);
    res.code(201).send(Board.toResponse(newBoard));
};

const putBoard = async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const item = (await boards).find(board => board.id === id);
    if (!item) res.code(404).send(notFound('board', id));
    item.title = title;
    item.columns = columns;
    res.send(Board.toResponse(item));
};

const deleteBoard = async (req, res) => {
    const { id } = req.params;
    await deleteBoardsTasks(id);
    boards = (await boards).filter(board => board.id !== id);
    res.send(removed('board', id));
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    postBoard,
    putBoard,
};