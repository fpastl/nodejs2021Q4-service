import Board from './board.model';
import getAll from './board.service';
import { deleteBoardsTasks } from '../tasks/task.controllers';
import { notFound, removed } from '../../constants/messages';
import routeHandler, { boardInterface } from "../../constants/types";

let boards: Promise<Board[]> | Board[] = getAll();
type boardParams = { id: string };

export const getBoards: routeHandler = async (req, res) => res.send((await boards).map(Board.toResponse));

export const getBoard: routeHandler = async (req, res) => {
    const { id } = req.params as boardParams;
    const item = (await boards).find(board => board.id === id);
    if (!item) res.code(404).send(notFound('board', id));
    res.send(item);
};

export const postBoard: routeHandler = async (req, res) => {
    const newBoard = new Board(req.body as boardInterface);
    (await boards).push(newBoard);
    res.code(201).send(Board.toResponse(newBoard));
};

export const putBoard: routeHandler = async (req, res) => {
    const { id } = req.params as boardParams;
    const { title, columns } = req.body as boardInterface;
    const item = (await boards).find(board => board.id === id);
    if (!item) res.code(404).send(notFound('board', id));
    else {
        item.title = title;
        item.columns = columns;
        res.send(Board.toResponse(item));
    }
};

export const deleteBoard: routeHandler = async (req, res) => {
    const { id } = req.params as boardParams;
    await deleteBoardsTasks(id);
    boards = (await boards).filter(board => board.id !== id);
    res.send(removed('board', id));
}