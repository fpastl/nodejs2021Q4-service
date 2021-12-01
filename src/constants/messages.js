const notFound = (obj,id) =>({message: `${obj} with id '${id}' not found`});

const removed = (obj,id) =>({message: `${obj} with id '${id}' has been removed`});

module.exports = {
    notFound,
    removed,
};