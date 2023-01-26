import { UpdateResult } from 'mongodb';
export interface IModel<T> {
    create(obj:T):Promise<T>,
    read():Promise<T[]>,
    readOne(_id:string):Promise<T | null>,
    readMany(ids:string[]):Promise<T[] | null>,
    readOneByEmail(email:string):Promise<T | null>,
    removeOneDisk(id:string, diskId: string):Promise<UpdateResult | null>,
    update(id:string, obj:object):Promise<T | null>,
    updateOneDisk(id:string, diskId:string):Promise<UpdateResult | null>,
    readOneByDisco(_diskId:string, userId:string):Promise<T | null>,
    delete(id: string):Promise<T | null>,
  }