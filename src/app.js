const app = require('fastify')({logger: true});
const usersRout = require('./resources/users/user.router');
const boardsRout = require('./resources/boards/board.router');
const tasksRout = require('./resources/tasks/task.router');

app.register(require('fastify-swagger'),{
    exposeRoute: true,
    routePrefix: '/docs',
    swagger:{
        info: {'title' : 'fastify-api'}
    }
});

app.register(usersRout);
app.register(boardsRout);
app.register(tasksRout);

module.exports = app;

