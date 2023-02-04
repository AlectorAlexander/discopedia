import { IDisk } from './src/interfaces/IDisks';
import mongoose from 'mongoose';
import Disk from './src/models/DisksModel';
import fs from 'fs';
import discos from './discos.json';
import * as dotenv from 'dotenv';
import UserModel from './src/models/UserModel';
dotenv.config();

const details = discos.map((el) => {
    return {
        Caracteristica: el.details['Característica:'],
        Formatos: el.details['Formatos:'],
        Gravadora: el.details['Gravadora:'] || '',
        Lancamento: Number(el.details['Lançamento:']),
        Observacao: el.details['Observação:'],
        Produtor: el.details['Produtor:'],
    };
});

const { MONGO_DB_URL } = process.env;

mongoose.connect(MONGO_DB_URL || 'error').then(() => {
    console.log('mongou-se');
}).catch((err) => {
    console.log(err);
    
});

const newDiscos: IDisk[] = [];

JSON.parse(fs.readFileSync('discos.json', 'utf-8')).forEach((ele: IDisk, i: number) => {
    console.log(ele);
    
    newDiscos.push(ele);
    newDiscos[i].created = new Date();
    newDiscos[i].updated = new Date();
    newDiscos[i].details = details[i];
});

const seedUsers = [
    {
        nome: 'Alberto Justus',
        email: 'admin@gmail.com',
        senha: '$2a$10$yo5nLTcfT65slw7XodspQutwJop1dBKUjZujrxWn64IniyetufXsm', /* "queijo_suiço", */
        discos: [
            '639d00ba6156ba6eec63b162',
            '639d00ba6156ba6eec63b163',
            '639d00ba6156ba6eec63b165'
        ]
    },
    {
        nome: 'Alehandro Pietro',
        email: 'user@gmail.com',
        senha: '$2a$10$UIeVcbA7eWZ10RD2B0bL9.b3o8ueFi.d4O838k.vmjpE0GCTtlAoq', //perna_de_grilo",
        discos: [
            '639d00ba6156ba6eec63b166',
            '639d00ba6156ba6eec63b167',
            '639d00ba6156ba6eec63b168'
        ]
    }
];


const DiskModel = new Disk();
const User = new UserModel();

const seedDB = async () => {
    await DiskModel.deleteMany({});
    await User.deleteMany({});
    await DiskModel.insertMany(newDiscos);
    await User.insertMany(seedUsers);
};

seedDB().then(() => {
    mongoose.connection.close();
});