import { IDisk } from './IDisks';
import { UpdateResult } from 'mongodb';
export interface IModel<T> {
    create(obj:T):Promise<T>,
    read():Promise<T[]>,
    readOne(_id:string):Promise<T | null>,
    readMany(ids:string[]):Promise<T[] | null>,
    readMultiple(params: Record<string, any>): Promise<Array<IDisk> | null>,
    readOneByEmail(email:string):Promise<T | null>,
    removeOneDisk(id:string, diskId: string):Promise<UpdateResult | null>,
    update(id:string, obj:object):Promise<T | null>,
    updateOneDisk(id:string, diskId:string):Promise<UpdateResult | null>,
    readPagination(page: number, limit: number): Promise<T[]>,
    readOneByDisco(_diskId:string, userId:string):Promise<T | null>,
    delete(id: string):Promise<T | null>,
  }