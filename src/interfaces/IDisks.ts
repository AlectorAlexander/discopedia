import { z } from 'zod';

export const DiskZodSchema = z.object({
    title: z.string({
        required_error: 'title is required',
        invalid_type_error: 'title must be a string',
    }).min(1, { message: 'title must be 1 or more characters long' }),
    details: z.object({
        Característica: z.string({
            required_error: 'Característica is required',
            invalid_type_error: 'Característica must be a string',
        }).min(1, { message: 'Característica must be 1 or more characters long' }),
        Gravadora: z.string({
            required_error: 'Gravadora is required',
            invalid_type_error: 'Gravadora must be a string',
        }).min(1, { message: 'Gravadora must be 1 or more characters long' }),
        Produtor: z.string({
            required_error: 'Produtor is required',
            invalid_type_error: 'Produtor must be a string',
        }),
        Formatos: z.string({
            required_error: 'Formato is required',
            invalid_type_error: 'Formato must be a string',
        }).min(1, { message: 'Formato must be 1 or more characters long' }),
        Lançamento: z.string({
            required_error: 'Lançamento is required',
            invalid_type_error: 'Lançamento must be a string',
        }).min(1, { message: 'Lançamento must be 1 or more characters long' }),
        Observação: z.string({
            required_error: 'Observação is required',
            invalid_type_error: 'Observação must be a string',
        }).min(1, { message: 'Observação must be 1 or more characters long' })
    }),
    artist: z.string({
        required_error: 'artist is required',
        invalid_type_error: 'artist must be a string',
    }).min(1, { message: 'artist must be 1 or more characters long' }),
    musics: z.array(z.string()),
    url_image: z.string({
        required_error: 'url_image is required',
        invalid_type_error: 'url_image must be a string',
    }).min(3, { message: 'url_image must be 3 or more characters long' }),
    created: z.date({
        required_error: 'created is required',
        invalid_type_error: 'created must be a string',
    }),
    updated: z.date({
        required_error: 'updated is required',
        invalid_type_error: 'updated must be a string',
    }),
});

export type IDisk = z.infer<typeof DiskZodSchema>