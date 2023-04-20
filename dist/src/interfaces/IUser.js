"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
exports.UserZodSchema = zod_1.z.object({
    _id: zod_1.z.optional(zod_1.z.instanceof(mongodb_1.ObjectId)),
    nome: zod_1.z.string({
        required_error: 'nome is required',
        invalid_type_error: 'nome must be a string',
    }).min(3, { message: 'nome must be 3 or more characters long' }),
    email: zod_1.z.string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
    }).min(10, { message: 'email must be 3 or more characters long' }),
    discos: zod_1.z.array(zod_1.z.string()),
    senha: zod_1.z.string({
        required_error: 'senha is required',
        invalid_type_error: 'senha must be a string',
    }).min(5, { message: 'senha must be 3 or more characters long' }),
});
