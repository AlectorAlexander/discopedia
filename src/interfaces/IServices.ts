export interface IService<T> {
    create(obj:unknown):Promise<T>,
    read():Promise<T[]>,
    readOne(_id:string):Promise<T>,
    update(id:string, obj:T):Promise<T>,
    delete(id: string):Promise<T>,
  }