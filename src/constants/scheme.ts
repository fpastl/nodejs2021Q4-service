import routeHandler from "./types";

const messageObj = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
};

const getAllScheme = (items: object, handler: routeHandler) => ({
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
const getOneScheme = (item: object, handler: routeHandler) => ({
    schema: {
        response: {
            200: item,
            404: messageObj
        }
    },
    handler
});
const deleteScheme = (handler: routeHandler) => ({
    schema: {
        response: {
            200: messageObj,
            404: messageObj
        }
    },
    handler
});

module.exports = {
    getAllScheme,
    getOneScheme,
    deleteScheme,
};