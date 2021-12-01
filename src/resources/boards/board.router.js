const { getBoards, getBoard, postBoard, putBoard, deleteBoard } = require('./board.controllers');

async function router(fastify) {

  const itemBoardScheme = ({
    id = true,
    title = true,
    columns = true
  } = {}) => {
    const obj = {
      type: 'object',
      properties: {}
    }
    if (id) obj.properties.id = { type: 'string' };
    if (title) obj.properties.title = { type: 'string' };
    if (columns) obj.properties.columns = { type: 'array' };
    return obj;
  }

  const getBoardsScheme = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: itemBoardScheme()
        }
      }
    },
    handler: getBoards
  };
  const getBoardByIdScheme = {
    schema: {
      response: {
        200: itemBoardScheme()
      }
    },
    handler: getBoard
  };
  const postBoardScheme = {
    schema: {
      body: {
        ...(itemBoardScheme({ id: false })),
        additionalProperties: false,
        required: [
          'title',
        ],
      },
      response: {
        201: itemBoardScheme()
      }
    },
    handler: postBoard
  };
  const putBoardScheme = {
    schema: {
      body: {
        ...(itemBoardScheme({ id: false })),
        additionalProperties: false,
        required: [
          'title',
        ],
      },
      response: {
        200: itemBoardScheme()
      }
    },
    handler: putBoard
  };

  const deleteBoardScheme = {
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
    handler: deleteBoard
  };

  fastify.get('/boards', getBoardsScheme);
  fastify.get('/boards/:id', getBoardByIdScheme);
  fastify.post('/boards', postBoardScheme);
  fastify.put('/boards/:id', putBoardScheme);
  fastify.delete('/boards/:id', deleteBoardScheme);
};

module.exports = router;
