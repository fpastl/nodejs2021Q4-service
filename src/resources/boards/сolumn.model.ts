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

    /**
     * Return fields of class Column 
     * @param column class Column object 
     * @returns class with Column fields 
     */
    static toResponse(column:Column) {
        const { id, title, order } = column;
        return { id, title, order };
    }
}