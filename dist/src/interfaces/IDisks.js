"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskZodSchema = void 0;
const zod_1 = require("zod");
exports.DiskZodSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    title: zod_1.z.string({
        required_error: 'title is required',
        invalid_type_error: 'title must be a string',
    }).min(1, { message: 'title must be 1 or more characters long' }),
    details: zod_1.z.object({
        Caracteristica: zod_1.z.string({
            required_error: 'Característica is required',
            invalid_type_error: 'Característica must be a string',
        }).min(1, { message: 'Característica must be 1 or more characters long' }),
        Gravadora: zod_1.z.string({
            required_error: 'Gravadora is required',
            invalid_type_error: 'Gravadora must be a string',
        }).min(1, { message: 'Gravadora must be 1 or more characters long' }),
        Produtor: zod_1.z.string({
            required_error: 'Produtor is required',
            invalid_type_error: 'Produtor must be a string',
        }),
        Formatos: zod_1.z.string({
            required_error: 'Formato is required',
            invalid_type_error: 'Formato must be a string',
        }).min(1, { message: 'Formato must be 1 or more characters long' }),
        Lancamento: zod_1.z.number({
            required_error: 'Lançamento is required',
            invalid_type_error: 'Lançamento must be a number',
        }).min(1, { message: 'Lançamento must be 1 or more characters long' }),
        Observacao: zod_1.z.string({
            required_error: 'Observação is required',
            invalid_type_error: 'Observação must be a string',
        }).min(1, { message: 'Observação must be 1 or more characters long' })
    }),
    artist: zod_1.z.string({
        required_error: 'artist is required',
        invalid_type_error: 'artist must be a string',
    }).min(1, { message: 'artist must be 1 or more characters long' }),
    musics: zod_1.z.array(zod_1.z.string()),
    album_link: zod_1.z.string({
        required_error: 'album_link is required',
        invalid_type_error: 'album_link must be a string',
    }).min(1, { message: 'album_link must be 1 or more characters long' }),
    url_img: zod_1.z.string({
        required_error: 'url_image is required',
        invalid_type_error: 'url_image must be a string',
    }).min(3, { message: 'url_image must be 3 or more characters long' }),
    created: zod_1.z.date({
        required_error: 'created is required',
        invalid_type_error: 'created must be a string',
    }),
    updated: zod_1.z.date({
        required_error: 'updated is required',
        invalid_type_error: 'updated must be a string',
    }),
});
