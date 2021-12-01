const uuid = require('uuid');

class Task {
    constructor(
        {
            id = uuid.v4(),
            title = undefined,
            order = undefined,
            description = undefined,
            userId = undefined,
            boardId = undefined,
            columnId = undefined
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

    static toResponse(task) {
        const { id, title, order, description, userId, columnId, boardId } = task;
        return { id, title, order, description, userId, columnId, boardId };
    }
}

module.exports = Task;