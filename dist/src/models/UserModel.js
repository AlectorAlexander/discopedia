"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongooseSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = __importDefault(require("./MongoModel"));
exports.UserMongooseSchema = new mongoose_1.Schema({
    nome: String,
    email: String,
    discos: Array,
    senha: String,
});
class UserModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('UserModel', exports.UserMongooseSchema)) {
        super(model);
    }
}
exports.default = UserModel;
