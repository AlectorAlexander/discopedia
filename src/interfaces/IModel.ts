export interface IModel<T> {
    create(obj:T):Promise<T>,
    read():Promise<T[]>,
    readOne(_id:string):Promise<T | null>,
    readOneByEmail(_id:string):Promise<T | null>,
    update(id:string, obj:object):Promise<T | null>,
    delete(id: string):Promise<T | null>,
  }