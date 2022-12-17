import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import MongoModel from './MongoModel';

export const UserMongooseSchema = new Schema<IUser>({
    nome: String,  
    email: String,
    discos: Array,
    senha: String,
});

class UserModel extends MongoModel<IUser> {
    constructor(model = mongooseCreateModel('UserModel', UserMongooseSchema)) {
        super(model);
    }
}

export default UserModel;