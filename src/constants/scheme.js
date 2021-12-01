const messageObj = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
};

const getAllScheme = (items, handler) => ({
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
const getOneScheme = (item, handler) => ({
    schema: {
        response: {
            200: item
        }
    },
    handler
});
const deleteScheme = (handler) => ({
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