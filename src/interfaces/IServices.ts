import { UpdateResult, ObjectId } from 'mongodb';
import {  JwtPayload } from 'jwt-decode';
import { IDisk } from './IDisks';
import {  errorService } from './IErrors';
import { IUser } from './IUser';
import { Error } from 'mongoose';

export interface createResponse {
  error?: errorService;
  email?: string;
  senha?: string;
  discos?: string[];
  nome?: string;
  _id?: ObjectId;
  }

export interface updateResponse {
    error?: errorService;
    email?: string;
    senha?: string;
    discos?: string[];
    nome?: string;
    _id?: ObjectId;
    }

export interface IServiceDisks<T> {
    create(obj:IDisk):Promise<T>,
    read():Promise<T[]>,
    readOne(_id:string):Promise<T>,
    update(id:string, obj:T):Promise<T>,
    delete(id: string):Promise<T>,
  }

export interface IServiceUsers<T> {
    create(obj:IUser):Promise<createResponse>,
    read():Promise<T[]>,
    readOne(email:string):Promise<T>,
    readOneById(_id:string):Promise<T>,
    readMany(ids:string[]):Promise<T[] | null>,
    update(id:string, obj:T):Promise<T>,
    updateUserDisks(id:string, diskId: string): Promise<UpdateResult | Error>,
    removeUserDisk(id:string, diskId: string):Promise<UpdateResult | Error>,
    delete(id: string):Promise<T>,
    login(email:string, senha:string):Promise<createResponse>,
    decodedToken(token: string): JwtPayload | any,
  }