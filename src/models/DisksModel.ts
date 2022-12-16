import { IDisk } from './../interfaces/IDisks';
import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';

export const DiskMongooseSchema = new Schema<IDisk>({
    title: String,  
    details: {
        Característica: String,
        Gravadora: String,
        Produtor: String,
        Formatos: String,
        Lançamento: String,
        Observação: String,
    },  
    artist: String,
    musics: Array<string>,
    url_image: String,
    created: Date,
    updated: Date,
});

class Disk extends MongoModel<IDisk> {
    constructor(model = mongooseCreateModel('Disk', DiskMongooseSchema)) {
        super(model);
    }
}

export default Disk;