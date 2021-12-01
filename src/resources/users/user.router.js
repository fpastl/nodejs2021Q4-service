const { getUsers, getUser, postUser, putUser, deleteUser } = require('./user.controllers');

async function router(fastify) {

  const itemUserScheme = ({
    id = true,
    name = true,
    login = true,
    password = false
  } = {}) => {
    const obj = {
      type: "object",
      properties: {}
    };
    if (id) obj.properties.id = { type: 'string' };
    if (name) obj.properties.name = { type: 'string' };
    if (login) obj.properties.login = { type: 'string' };
    if (password) obj.properties.password = { type: 'string' };
    return obj;
  }

  const getUsersScheme = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: itemUserScheme()
        }
      }
    },
    handler: getUsers
  };
  const getUserByIdScheme = {
    schema: {
      response: {
        200: itemUserScheme()
      }
    },
    handler: getUser
  };
  const postUserScheme = {
    schema: {
      body: {
        ...(itemUserScheme({ id: false, password: true })),
        additionalProperties: false,
        required: [
          'name',
          'login',
          'password'
        ],
      },
      response: {
        201: itemUserScheme()
      }
    },
    handler: postUser
  };
  const putUserScheme = {
    schema: {
      body: {
        ...(itemUserScheme({ id: false, password: true })),
        additionalProperties: false,
        required: [
          'name',
          'login',
          'password'
        ],
      },
      response: {
        200: itemUserScheme()
      }
    },
    handler: putUser
  };

  const deleteUserScheme = {
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
    handler: deleteUser
  };

  fastify.get('/users', getUsersScheme);
  fastify.get('/users/:id', getUserByIdScheme);
  fastify.post('/users', postUserScheme);
  fastify.put('/users/:id', putUserScheme);
  fastify.delete('/users/:id', deleteUserScheme);
};

module.exports = router;
