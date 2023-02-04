import { IDisk } from './../interfaces/IDisks';
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

    public async readPagination(page: number, limit: number): Promise<T[]> {
        const result = await this._model.find({ }).skip((page - 1) * limit).limit(limit);
        return result;
    }

    public async readMultiple(params: Record<string, any>): Promise<Array<IDisk> | null> {
        const query: Record<string, any> = {};
        for (const key in params) {
            if (key === 'title') {
                query[key] = { $regex: new RegExp(params[key], 'i') };
            } else if (key === 'artist') {
                query[key] = { $regex: new RegExp(params[key], 'i') };
            } else if (key === 'details.Caracteristica') {
                query['details.Caracteristica'] = { $regex: new RegExp(params[key], 'i') };
            } else if (key === 'details.Formatos') {
                query['details.Formatos'] = { $regex: new RegExp(params[key], 'i') };
            }
            else if (key === 'details.Gravadora') {
                query['details.Gravadora'] = { $regex: new RegExp(params[key], 'i') };
            }
            else if (key === 'details.Produtor') {
                query['details.Produtor'] = { $regex: new RegExp(params[key], 'i') };
            }
            else if (key === 'details.Lancamento') {
                query['details.Lancamento'] = {
                    '$gte': params[key][0],
                    '$lte': params[key][1]
                };
            }
            else if (key === 'musics') {
                query['musics'] = { $elemMatch: { $regex: new RegExp(params[key], 'i') } };
            }
        }
        console.log(query); // { details: { Caracteristica: { '$regex': /instrumental/i } } }
        const result = await this._model.find(query) as unknown as IDisk[];
        return result;
    }
    
    

    public async readMany(ids: string[]): Promise<T[] | null> {
        ids.forEach(id => {
            if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
        });
        const result = await this._model.find({ _id: { $in: ids } }).select('-senha');
        return result;
    }
    

    public async readOneByDisco(_diskId:string, userId:string):Promise<T | null> {
        if (!isValidObjectId(_diskId) || !isValidObjectId(userId)) throw Error(ErrorTypes.InvalidMongoId);
        const result = await this._model.findOne({_id: userId}, { discos: { $elemMatch: { _id: _diskId} } });
        return result;
    }

    public async readOneByEmail(email:string):Promise<T | null> {
        const result = await this._model.findOne({ email });
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

    public async removeOneDisk(id:string, diskId: string):Promise<UpdateResult | null> {
        if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
        const result = await this._model.updateOne(
            { _id: id },
            { $pull: { discos: diskId } }
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