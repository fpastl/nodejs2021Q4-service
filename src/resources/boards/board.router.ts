import { FastifyPluginAsync } from "fastify";
import { boardInterfaceSchemeProperties } from "../../constants/types";
import { getBoards, getBoard, postBoard, putBoard, deleteBoard } from './board.controllers';
import { getAllScheme, getOneScheme, deleteScheme } from '../../constants/scheme';

/**
 * Manages routes for board
 * @param fastify is the encapsulated Fastify instance
 */
const router: FastifyPluginAsync = async (fastify) => {

  const itemBoardScheme = ({
    id = true,
    title = true,
    columns = true
  } = {}) => {
    const obj: {
      type: string,
      properties: boardInterfaceSchemeProperties
    } = {
      type: 'object',
      properties: {}
    }
    if (id) obj.properties.id = { type: 'string' };
    if (title) obj.properties.title = { type: 'string' };
    if (columns) obj.properties.columns = { type: 'array' };
    return obj;
  }

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

  fastify.get('/boards', getAllScheme(itemBoardScheme(), getBoards));
  fastify.get('/boards/:id', getOneScheme(itemBoardScheme(), getBoard));
  fastify.post('/boards', postBoardScheme);
  fastify.put('/boards/:id', putBoardScheme);
  fastify.delete('/boards/:id', deleteScheme(deleteBoard));
};

export default router;
