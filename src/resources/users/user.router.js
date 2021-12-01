const { getUsers, getUser, postUser,putUser,deleteUser} = require('./user.controllers');

async function router(fastify) {

  const itemUserSchemeShow = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      login: { type: 'string' }
    }
  };
  const itemUserSchemePost = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' }
    }
  };

  const getUsersScheme = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: itemUserSchemeShow
        }
      }
    },
    handler: getUsers
  };
  const getUserByIdScheme = {
    schema: {
      response: {
        200: itemUserSchemeShow
      }
    },
    handler: getUser
  };
  const postUserScheme = {
    schema: {
      body: {
        ...itemUserSchemePost,
        additionalProperties: false,
        required: [
          'name',
          'login',
          'password'
        ],
      },
      response: {
        201: itemUserSchemeShow
      }
    },
    handler: postUser
  };
  const putUserScheme = {
    schema: {
      body: {
        ...itemUserSchemePost,
        additionalProperties: false,
        required: [
          'name',
          'login',
          'password'
        ],
      },
      response: {
        200: itemUserSchemeShow
      }
    },
    handler: putUser
  };

  const deleteUserScheme = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties:{
            message: {type: 'string'}
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
