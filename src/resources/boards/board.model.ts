import { v4 } from 'uuid';

export default class Board {
    id: string;
    title: string;
    columns: string[];

    constructor(
        {
            id = v4(),
            title = "",
            columns = [] as string[],
        } = {}
    ) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }

    static toResponse(board: Board) {
        const { id, title, columns } = board;
        return { id, title, columns };
    }
}