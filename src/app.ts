import fastify, { FastifyPluginCallback } from 'fastify';
import FastifyPlugin from 'fastify-swagger';
import usersRout from './resources/users/user.router';
import boardsRout from './resources/boards/board.router';
import tasksRout from './resources/tasks/task.router';

const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
});
const swaggerOptions = {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger:{
        info: {'title' : 'fastify-api', 'version':1}
    }
};
app.register(FastifyPlugin as FastifyPluginCallback,swaggerOptions);

app.register(usersRout);
app.register(boardsRout);
app.register(tasksRout);

export default app;