const { getBoards, getBoard, postBoard,putBoard,deleteBoard} = require('./board.controllers');

async function router(fastify) {

  const itemBoardSchemeShow = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      columns : { type: 'array' },
    }
  };
  const itemBoardSchemePost = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        columns : { type: 'array' },
    }
  };

  const getBoardsScheme = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: itemBoardSchemeShow
        }
      }
    },
    handler: getBoards
  };
  const getBoardByIdScheme = {
    schema: {
      response: {
        200: itemBoardSchemeShow
      }
    },
    handler: getBoard
  };
  const postBoardScheme = {
    schema: {
      body: {
        ...itemBoardSchemePost,
        additionalProperties: false,
        required: [
          'title',
        ],
      },
      response: {
        201: itemBoardSchemeShow
      }
    },
    handler: postBoard
  };
  const putBoardScheme = {
    schema: {
      body: {
        ...itemBoardSchemePost,
        additionalProperties: false,
        required: [
          'title',
        ],
      },
      response: {
        200: itemBoardSchemeShow
      }
    },
    handler: putBoard
  };

  const deleteBoardScheme = {
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
    handler: deleteBoard
  };

  fastify.get('/boards', getBoardsScheme);
  fastify.get('/boards/:id', getBoardByIdScheme);
  fastify.post('/boards', postBoardScheme);
  fastify.put('/boards/:id', putBoardScheme);
  fastify.delete('/boards/:id', deleteBoardScheme);
};

module.exports = router;
