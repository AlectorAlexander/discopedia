"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const catalog_1 = require("../errors/catalog");
class MongoModel {
    constructor(model) {
        this._model = model;
    }
    async create(obj) {
        const result = await this._model.create({ ...obj });
        return result;
    }
    async insertMany(array) {
        const result = await this._model.insertMany(array);
        return result;
    }
    async read() {
        const result = await this._model.find({});
        return result;
    }
    async readOne(_id) {
        if (!(0, mongoose_1.isValidObjectId)(_id))
            throw Error(catalog_1.ErrorTypes.InvalidMongoId);
        const result = await this._model.findOne({ _id }).select('-senha');
        return result;
    }
    async readPagination(page, limit) {
        const result = await this._model.find({}).skip((page - 1) * limit).limit(limit);
        return result;
    }
    async readMultiple(params) {
        const query = {};
        for (const key in params) {
            if (key === 'title') {
                query[key] = { $regex: new RegExp(params[key], 'i') };
            }
            else if (key === 'artist') {
                query[key] = { $regex: new RegExp(params[key], 'i') };
            }
            else if (key === 'details.Caracteristica') {
                query['details.Caracteristica'] = { $regex: new RegExp(params[key], 'i') };
            }
            else if (key === 'details.Formatos') {
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
        const result = await this._model.find(query);
        return result;
    }
    async readMany(ids) {
        ids.forEach(id => {
            if (!(0, mongoose_1.isValidObjectId)(id))
                throw Error(catalog_1.ErrorTypes.InvalidMongoId);
        });
        const result = await this._model.find({ _id: { $in: ids } }).select('-senha');
        return result;
    }
    async readOneByDisco(_diskId, userId) {
        if (!(0, mongoose_1.isValidObjectId)(_diskId) || !(0, mongoose_1.isValidObjectId)(userId))
            throw Error(catalog_1.ErrorTypes.InvalidMongoId);
        const result = await this._model.findOne({ _id: userId }, { discos: { $elemMatch: { _id: _diskId } } });
        return result;
    }
    async readOneByEmail(email) {
        const result = await this._model.findOne({ email });
        return result;
    }
    async update(id, obj) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw Error(catalog_1.ErrorTypes.InvalidMongoId);
        const result = await this._model.findByIdAndUpdate(id, obj);
        return result;
    }
    async updateOneDisk(id, diskId) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw Error(catalog_1.ErrorTypes.InvalidMongoId);
        const result = await this._model.updateOne({ _id: id }, { $push: { discos: diskId } });
        return result;
    }
    async removeOneDisk(id, diskId) {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw Error(catalog_1.ErrorTypes.InvalidMongoId);
        const result = await this._model.updateOne({ _id: id }, { $pull: { discos: diskId } });
        return result;
    }
    async delete(_id) {
        if (!(0, mongoose_1.isValidObjectId)(_id))
            throw Error(catalog_1.ErrorTypes.InvalidMongoId);
        const result = await this._model.findByIdAndDelete({ _id });
        return result;
    }
    async deleteMany(condition) {
        return await this._model.deleteMany(condition).exec();
    }
}
exports.default = MongoModel;
