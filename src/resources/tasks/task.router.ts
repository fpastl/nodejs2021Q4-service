import { FastifyPluginAsync } from "fastify";
import { getTasks, getTask, postTask, putTask, deleteTask } from './task.controllers';
import { getAllScheme, getOneScheme, deleteScheme } from '../../constants/scheme';
import { taskInterfaceSchemeProperties } from "../../constants/types";

const router: FastifyPluginAsync = async function (fastify) {

    const itemTaskScheme = ({
        id = true,
        boardId = true,
        title = true,
        order = true,
        description = true,
        taskId = true,
        columnId = true,
        userId = true } = {}) => {
        const taskScheme: {
            type: string,
            properties: taskInterfaceSchemeProperties
        } = {
            type: 'object',
            properties: {}
        };
        if (id) taskScheme.properties.id = { type: 'string' };
        if (boardId) taskScheme.properties.boardId = { type: 'string' };
        if (title) taskScheme.properties.title = { type: 'string' };
        if (order) taskScheme.properties.order = { type: 'number' };
        if (description) taskScheme.properties.description = { type: 'string' };
        if (columnId) taskScheme.properties.columnId = { type: ['string', 'null'] };
        if (userId) taskScheme.properties.userId = { type: ['string', 'null'] };
        return taskScheme;
    }

    const postTaskScheme = {
        schema: {
            body: {
                ...(itemTaskScheme({ id: false, boardId: false })),
                additionalProperties: false,
                required: [
                    'title',
                    'order',
                    'description',
                ],
            },
            response: {
                201: itemTaskScheme()
            }
        },
        handler: postTask
    };
    const putTaskScheme = {
        schema: {
            body: {
                ...(itemTaskScheme({ id: false, boardId: false })),
                additionalProperties: false,
                required: [
                    'title',
                    'order',
                    'description',
                ],
            },
            response: {
                200: itemTaskScheme()
            }
        },
        handler: putTask
    };

    fastify.get('/boards/:boardId/tasks', getAllScheme(itemTaskScheme(), getTasks));
    fastify.get('/boards/:boardId/tasks/:taskId', getOneScheme(itemTaskScheme(), getTask));
    fastify.post('/boards/:boardId/tasks', postTaskScheme);
    fastify.put('/boards/:boardId/tasks/:taskId', putTaskScheme);
    fastify.delete('/boards/:boardId/tasks/:taskId', deleteScheme(deleteTask));
};

export default router;
