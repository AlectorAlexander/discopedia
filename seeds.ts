import { IDisk } from './src/interfaces/IDisks';
import mongoose from 'mongoose';
import Disk from './src/models/DisksModel';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const { MONGO_DB_URL } = process.env;

mongoose.connect(MONGO_DB_URL || 'error').then(() => {
    console.log('mongou-se');
}).catch((err) => {
    console.log(err);
    
});

const newDiscos: IDisk[] = [];

JSON.parse(fs.readFileSync('discos.json', 'utf-8')).forEach((ele: IDisk, i: number) => {
    newDiscos.push(ele);
    newDiscos[i].created = new Date();
    newDiscos[i].updated = new Date();
});


const DiskModel = new Disk();

const seedDB = async () => {
    await DiskModel.deleteMany({});
    await DiskModel.insertMany(newDiscos);
};

seedDB().then(() => {
    mongoose.connection.close();
});