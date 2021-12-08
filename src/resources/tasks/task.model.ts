import { v4 } from 'uuid';
import {taskInterface} from '../../constants/types'

export default class Task {
    id:string;
    title:string|undefined;
    order:number|undefined;
    description:string|undefined;
    userId:string|undefined|null;
    boardId:string;
    columnId:string|undefined;
    constructor(
        {
            id = v4(),
            title = "",
            order = 0,
            description = "",
            userId = "",
            boardId = "",
            columnId = ""
        } = {}
    ) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }

    static toResponse(task:Task) {
        const { id, title, order, description, userId, columnId, boardId } = task;
        return { id, title, order, description, userId, columnId, boardId };
    }
}