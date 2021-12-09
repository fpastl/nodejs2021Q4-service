/**
 * generate notFound message
 * @param obj name or type of object
 * @param id id of object
 * @returns object with message
 */
export const notFound = (obj:string,id:string) =>({message: `${obj} with id '${id}' not found`});

/**
 * generate removed message
 * @param obj name or type of object
 * @param id id of object
 * @returns object with message
 */
export const removed = (obj:string,id:string) =>({message: `${obj} with id '${id}' has been removed`});