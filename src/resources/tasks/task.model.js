const uuid = require('uuid');

class Column {
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

    static toResponse(column) {
        const { id, title, order, description, userId, columnId } = column;
        return { id, title, order, description, userId, columnId };
    }
}

module.exports = Column;