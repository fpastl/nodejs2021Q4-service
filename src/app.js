const app = require('fastify')({logger: true});
const usersRout = require('./resources/users/user.router');
const boardsRout = require('./resources/boards/board.router');

app.register(require('fastify-swagger'),{
    exposeRoute: true,
    routePrefix: '/docs',
    swagger:{
        info: {'title' : 'fastify-api'}
    }
});

app.register(usersRout);
app.register(boardsRout);

module.exports = app;

