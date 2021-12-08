import { v4 } from 'uuid';

export default class Column {
    id: string;
    title: string;
    order: number;
    constructor(
        {
            id = v4(),
            title = "",
            order = 0
        } = {}
    ) {
        this.id = id;
        this.title = title;
        this.order = order;
    }

    static toResponse(column:Column) {
        const { id, title, order } = column;
        return { id, title, order };
    }
}