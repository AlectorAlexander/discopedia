import { IDisk } from './../interfaces/IDisks';
import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';

export const DiskMongooseSchema = new Schema<IDisk>({
    title: String,  
    details: {
        Caracteristica: String,
        Formatos: String,
        Gravadora: String,
        Lancamento: Number,
        Observacao: String,
        Produtor: String,
    },  
    artist: String,
    musics: Array<string>,
    url_img: String,
    created: Date,
    updated: Date,
});

class DiskModel extends MongoModel<IDisk> {
    constructor(model = mongooseCreateModel('Disk', DiskMongooseSchema)) {
        super(model);
    }
}

export default DiskModel;