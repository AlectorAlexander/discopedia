import { InvalidTokenError, JwtPayload } from 'jwt-decode';
import { IDisk } from './IDisks';
import { ErrorService, errorService } from './IErrors';
import { IUser } from './IUser';

export interface IServiceDisks<T> {
    create(obj:IDisk):Promise<T>,
    read():Promise<T[]>,
    readOne(_id:string):Promise<T>,
    update(id:string, obj:T):Promise<T>,
    delete(id: string):Promise<T>,
  }

export interface IServiceUsers<T> {
    create(obj:IUser):Promise<string | ErrorService>,
    read():Promise<T[]>,
    readOne(_id:string):Promise<T>,
    update(id:string, obj:T):Promise<T>,
    delete(id: string):Promise<T>,
    login(email:string, senha:string):Promise<string | errorService>,
    decodedToken(token: string): JwtPayload | any,
  }