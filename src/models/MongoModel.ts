import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import { UpdateResult } from 'mongodb';

abstract class MongoModel<T> implements IModel<T> {
    protected _model:Model<T>;

    constructor(model:Model<T>) {
        this._model = model;
    }

    public async create(obj:T):Promise<T> {
        const result = await this._model.create({ ...obj });
        return result;
    }

    public async insertMany(array: Array<T>):Promise<T[]> {
        const result = await this._model.insertMany(array);
        return result;
    }

    public async read():Promise<T[]> {
        const result = await this._model.find({ });
        return result;
    }

    public async readOne(_id:string):Promise<T | null> {
        if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
        const result = await this._model.findOne({ _id }).select('-senha');
        return result;
    }

    public async readMany(ids: string[]): Promise<T[] | null> {
        ids.forEach(id => {
            if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
        });
        const result = await this._model.find({ _id: { $in: ids } }).select('-senha');
        return result;
    }
    

    public async readOneByDisco(_diskId:string):Promise<T | null> {
        if (!isValidObjectId(_diskId)) throw Error(ErrorTypes.InvalidMongoId);
        const result = await this._model.findOne({ discos: _diskId });
        return result;
    }

    public async readOneByEmail(email:string):Promise<T | null> {
        const result = await this._model.findOne({ email }).select('-senha');
        return result;
    }

    public async update(id:string, obj: object):Promise<T | null> {
        if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
        const result = await this._model.findByIdAndUpdate(id, obj);
        return result;
    }

    public async updateOneDisk(id:string, diskId: string):Promise<UpdateResult | null> {
        if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
        const result = await this._model.updateOne(
            { _id: id },
            { $push: { discos: diskId } }
        );
        return result;
    }

    public async delete(_id:string):Promise<T | null> {
        if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
        const result = await this._model.findByIdAndDelete({ _id });
        return result;
    }

    public async deleteMany(condition: any): Promise<any> {
        return await this._model.deleteMany(condition).exec();
    }

}

export default MongoModel;