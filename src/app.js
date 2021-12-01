const app = require('fastify')({logger: true});
const usersRout = require('./resources/users/user.router');

// eslint-disable-next-line no-unused-vars
app.get('/', async (req, res) => "'Service is running!'");
app.register(require('fastify-swagger'),{
    exposeRoute: true,
    routePrefix: '/docs',
    swagger:{
        info: {'title' : 'fastify-api'}
    }
});

app.register(usersRout);

module.exports = app;

