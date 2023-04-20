"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGO_DB_URL } = process.env;
const connectToDatabase = (mongoDatabaseURI = MONGO_DB_URL) => mongoose_1.default.connect(mongoDatabaseURI || 'error');
exports.default = connectToDatabase;
