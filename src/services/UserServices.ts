import { createResponse } from './../interfaces/IServices';
import { UpdateResult } from 'mongodb';
import { ErrorTypes } from './../errors/catalog';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import bcrypt from 'bcryptjs';
import { IUser, UserZodSchema } from '../interfaces/IUser';
import { IServiceUsers } from '../interfaces/IServices';
import { IModel } from '../interfaces/IModel';
import { Error } from 'mongoose';
import DiskService from './DisksServices';
import DiskModel from '../models/DisksModel';

const Disk = new DiskModel();
const diskService = new DiskService(Disk);


const saltRounds = 10;


export default class UserServices implements IServiceUsers<IUser> {
    private _User:IModel<IUser>;

    constructor(model:IModel<IUser>) {
        this._User = model;
    }

    public async create(obj: IUser):Promise<createResponse> {
        const parsed = UserZodSchema.safeParse(obj);
    
        if (parsed.success === false) {
            throw parsed.error;
        }
        const { email, senha, discos, nome } = obj;
    
        const findInfo = await this._User.readOneByEmail(email);
        if (findInfo) return { error: { message: 'User already registered', status: 409 } };
        const newSenha = await bcrypt.hash(senha, saltRounds);
    
        const response = await this._User.create({email, senha: newSenha, discos, nome});
        
        
        return response;
    }
  

    public async read():Promise<IUser[]> {
        const User = await this._User.read();
        if (!User) throw new Error(ErrorTypes.EntityNotFound);
        return User;
    }

    public async readOne(email:string):Promise<IUser> {
        const User = await this._User.readOneByEmail(email);
        if (!User) throw new Error(ErrorTypes.EntityNotFound);
        return User;
    }

    public async update(id:string, obj: IUser | object):Promise<IUser> {
        const User = await this._User.update(id, obj);
        const parsed = UserZodSchema.safeParse(obj);
        if (parsed.success === false) {
            throw parsed.error;
        }
        if (!User) throw new Error(ErrorTypes.EntityNotFound);
        return User;
    }

    public async delete(id:string):Promise<IUser> {
        const User = await this._User.delete(id);
        if (!User) throw new Error(ErrorTypes.EntityNotFound);
        return User;
    }

    public login = async (email: string, senha: string):Promise<createResponse> => {
        const foundUser = await this.readOne( email );
        const checkPassword = foundUser ? foundUser.senha : 'THISISNOTVALIDPASSWORD';
        const validateUser: boolean = bcrypt
            .compareSync(senha, checkPassword);


        const error = { status: 401, message: 'Incorrect email or senha' };

        if (!foundUser || !validateUser) return { error} ;

        return foundUser;
    };

    public decodedToken  = (token: string): JwtPayload | any => {
        try {
            return jwt_decode(token);
        } catch (error ) {
            return { error };
        }
    };

    public async updateUserDisks(id:string, diskId: string):Promise<UpdateResult | Error> {
        const User = await this._User.readOne(id);
        if (!User) throw new Error(ErrorTypes.EntityNotFound);  
        
        const Disk = await diskService.readOne(diskId);
        if (!Disk) throw new Error(ErrorTypes.EntityNotFound);
        
        const DiskUser = await this._User.readOneByDisco(diskId);
        if (DiskUser) throw new Error(ErrorTypes.uAlreadyHaveIt);

        
        
        const response = await this._User.updateOneDisk(id, diskId);
        if (!response) throw new Error(ErrorTypes.EntityNotFound);
        
        return response;
    }
}
