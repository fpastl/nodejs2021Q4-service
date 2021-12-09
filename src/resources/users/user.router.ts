import { FastifyPluginAsync } from "fastify";
import { userInterfaceSchemeProperties } from "../../constants/types";
import { getUsers, getUser, postUser, putUser, deleteUser } from './user.controllers';
import { getAllScheme, getOneScheme, deleteScheme } from '../../constants/scheme';

/**
 * Manages routes for user
 * @param fastify is the encapsulated Fastify instance
 */
const router: FastifyPluginAsync = async (fastify) => {

  /**
   * generates an user object template with the required fields
   * @param param0 object with options(user object fields to display(true) or not display(false)) 
   * @returns object to use inside fastify fluent schema
   */
  const itemUserScheme = ({
    id = true,
    name = true,
    login = true,
    password = false
  } = {}) => {
    const obj: {
      type: string,
      properties: userInterfaceSchemeProperties
    } = {
      type: "object",
      properties: {}
    };
    if (id) obj.properties.id = { type: 'string' };
    if (name) obj.properties.name = { type: 'string' };
    if (login) obj.properties.login = { type: 'string' };
    if (password) obj.properties.password = { type: 'string' };
    return obj;
  }

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

  fastify.get('/users', getAllScheme(itemUserScheme(), getUsers));
  fastify.get('/users/:id', getOneScheme(itemUserScheme(), getUser));
  fastify.post('/users', postUserScheme);
  fastify.put('/users/:id', putUserScheme);
  fastify.delete('/users/:id', deleteScheme(deleteUser));
};

export default router;
