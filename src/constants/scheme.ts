import routeHandler from "./types";

const messageObj = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
};

/**
 * generate fluent schema for get mehod to receiving all objects
 * @param items object with fields to send
 * @param handler request handler
 * @returns fluent schema object
 */
export const getAllScheme = (items: object, handler: routeHandler) => ({
    schema: {
        response: {
            200: {
                type: 'array',
                items
            }
        }
    },
    handler
});

/**
 * generate fluent schema for get mehod to receiving one object
 * @param items object with fields to send
 * @param handler request handler
 * @returns fluent schema object
 */
export const getOneScheme = (item: object, handler: routeHandler) => ({
    schema: {
        response: {
            200: item,
            404: messageObj
        }
    },
    handler
});

/**
 * generate fluent schema for deleye mehod
 * @param handler request handler
 * @returns fluent schema object
 */
export const deleteScheme = (handler: routeHandler) => ({
    schema: {
        response: {
            200: messageObj,
            404: messageObj
        }
    },
    handler
});