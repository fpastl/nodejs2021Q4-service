const { getTasks, getTask, postTask, putTask, deleteTask } = require('./task.controllers');

async function router(fastify) {

    const itemTaskScheme = ({id=true
        ,boardId=true
        ,title=true
        ,order=true
        ,description=true
        ,taskId=true
        ,columnId=true
        ,userId=true} = {}) => {
        const taskScheme = {
            type: 'object',
            properties:{}
        };
        if(id) taskScheme.properties.id = { type: 'string' };
        if(boardId) taskScheme.properties.boardId = { type: 'string' };
        if(title) taskScheme.properties.title = { type: 'string' };
        if(order) taskScheme.properties.order = { type: 'number' };
        if(description) taskScheme.properties.description = { type: 'string' };
        if(taskId) taskScheme.properties.taskId = { type: 'string' };
        if(columnId) taskScheme.properties.columnId = { type: ['string', 'null'] };
        if(userId) taskScheme.properties.userId = { type: ['string', 'null'] };
        return taskScheme;
    }
    
    const getTasksScheme = {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: itemTaskScheme()
                }
            }
        },
        handler: getTasks
    };
    const getTaskByIdScheme = {
        schema: {
            response: {
                200: itemTaskScheme()
            }
        },
        handler: getTask
    };
    const postTaskScheme = {
        schema: {
            body: {
                ...(itemTaskScheme({id:false, boardId:false})),
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
                ...(itemTaskScheme({id:false, boardId:false})),
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

    const deleteTaskScheme = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: deleteTask
    };

    fastify.get('/boards/:boardId/tasks', getTasksScheme);
    fastify.get('/boards/:boardId/tasks/:taskId', getTaskByIdScheme);
    fastify.post('/boards/:boardId/tasks', postTaskScheme);
    fastify.put('/boards/:boardId/tasks/:taskId', putTaskScheme);
    fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskScheme);
};

module.exports = router;
