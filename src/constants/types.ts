import { FastifyReply, FastifyRequest } from 'fastify';

type routeHandler = (req:FastifyRequest, res:FastifyReply) => Promise<void>;

export interface userInterface{
    id?:string;
    name:string;
    login:string;
    password:string;
}

export interface userInterfaceSchemeProperties{
    id?: SchemePropertie;
    name?:SchemePropertie;
    login?:SchemePropertie;
    password?:SchemePropertie;
}

interface SchemePropertie{
    type:string
}

export default routeHandler;