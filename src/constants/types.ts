import { FastifyReply, FastifyRequest } from 'fastify';

type routeHandler = (req: FastifyRequest, res: FastifyReply) => Promise<void>;

export interface userInterface {
    id?: string;
    name: string;
    login: string;
    password: string;
}

export interface userInterfaceSchemeProperties {
    id?: SchemePropertie;
    name?: SchemePropertie;
    login?: SchemePropertie;
    password?: SchemePropertie;
}

export interface taskInterface {
    id?: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
}
export interface taskInterfaceSchemeProperties {
    id?: SchemePropertie;
    title?: SchemePropertie;
    order?: SchemePropertie;
    description?: SchemePropertie;
    userId?: SchemePropertie;
    boardId?: SchemePropertie;
    columnId?: SchemePropertie;
}

interface SchemePropertie {
    type: string | string[]
}

export default routeHandler;