export const notFound = (obj:string,id:string) =>({message: `${obj} with id '${id}' not found`});

export const removed = (obj:string,id:string) =>({message: `${obj} with id '${id}' has been removed`});