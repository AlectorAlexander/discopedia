"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DisksModel_1 = __importDefault(require("./src/models/DisksModel"));
const fs_1 = __importDefault(require("fs"));
const discos_json_1 = __importDefault(require("./discos.json"));
const dotenv = __importStar(require("dotenv"));
const UserModel_1 = __importDefault(require("./src/models/UserModel"));
dotenv.config();
const details = discos_json_1.default.map((el) => {
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
mongoose_1.default.connect(MONGO_DB_URL || 'error').then(() => {
    console.log('mongou-se');
}).catch((err) => {
    console.log(err);
});
const newDiscos = [];
JSON.parse(fs_1.default.readFileSync('discos.json', 'utf-8')).forEach((ele, i) => {
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
        senha: '$2a$10$yo5nLTcfT65slw7XodspQutwJop1dBKUjZujrxWn64IniyetufXsm',
        discos: [
            '639d00ba6156ba6eec63b162',
            '639d00ba6156ba6eec63b163',
            '639d00ba6156ba6eec63b165'
        ]
    },
    {
        nome: 'Alehandro Pietro',
        email: 'user@gmail.com',
        senha: '$2a$10$UIeVcbA7eWZ10RD2B0bL9.b3o8ueFi.d4O838k.vmjpE0GCTtlAoq',
        discos: [
            '639d00ba6156ba6eec63b166',
            '639d00ba6156ba6eec63b167',
            '639d00ba6156ba6eec63b168'
        ]
    }
];
const DiskModel = new DisksModel_1.default();
const User = new UserModel_1.default();
const seedDB = async () => {
    await DiskModel.deleteMany({});
    await User.deleteMany({});
    await DiskModel.insertMany(newDiscos);
    await User.insertMany(seedUsers);
};
seedDB().then(() => {
    mongoose_1.default.connection.close();
});
