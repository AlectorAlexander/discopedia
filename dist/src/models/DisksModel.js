"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskMongooseSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = __importDefault(require("./MongoModel"));
exports.DiskMongooseSchema = new mongoose_1.Schema({
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
    musics: (Array),
    url_img: String,
    created: Date,
    updated: Date,
    album_link: String,
});
class DiskModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('Disk', exports.DiskMongooseSchema)) {
        super(model);
    }
}
exports.default = DiskModel;
