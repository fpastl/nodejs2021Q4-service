import routeHandler from "./types";

const messageObj = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
};

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
export const getOneScheme = (item: object, handler: routeHandler) => ({
    schema: {
        response: {
            200: item,
            404: messageObj
        }
    },
    handler
});
export const deleteScheme = (handler: routeHandler) => ({
    schema: {
        response: {
            200: messageObj,
            404: messageObj
        }
    },
    handler
});