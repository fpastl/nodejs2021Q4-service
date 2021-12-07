const notFound = (obj:string,id:string) =>({message: `${obj} with id '${id}' not found`});

const removed = (obj:string,id:string) =>({message: `${obj} with id '${id}' has been removed`});

module.exports = {
    notFound,
    removed,
};