import { Request, Response } from 'express';
import { IDisk } from '../interfaces/IDisks';
import { IServiceDisks } from '../interfaces/IServices';

export default class DiskController {
    constructor(private _service: IServiceDisks<IDisk>) { }

    public async create(
        req: Request,
        res: Response<IDisk>,
    ) {
        const {
            title, details, artist, musics, created, updated, url_img, album_link
        } = req.body;
        const newCreated = new Date(created);
        const newUpdated = new Date(updated);
        const Disk: IDisk = {
            title, details, album_link, artist, musics, created: newCreated, updated: newUpdated, url_img
        };
        const results: any = await this._service.create(Disk);
        return res.status(201).json(results);
    }

    public async read(
        req: Request,
        res: Response<IDisk[]>,
    ) {
        const result = await this._service.read();
        return res.status(200).json(result);
    }

    public async readOne(
        req: Request,
        res: Response<IDisk>,
    ) {
        const result = await this._service.readOne(req.params.id);
        return res.status(200).json(result);
    }

    public async readPaginationOnPage(
        req: Request,
        res: Response<IDisk[]>,
    ) {
        const { page, limit } = req.body;
        
        
        const result = await this._service.readPaginationpage(page, limit);
        return res.status(200).json(result);
    }

    public async readMultiples(
        req: Request,
        res: Response<IDisk[]>,
    ) {
        const { params } = req.body;
        const result = await this._service.readMultiple(params);
        return res.status(200).json(result);
    }

    public async update(
        req: Request,
        res: Response<IDisk>,
    ) {
        const {
            title, details, artist, album_link, musics, created, updated, url_img
        } = req.body;
    
        const { id } = req.params;
        const newCreated = new Date(created);
        const newUpdated = new Date(updated);
        const Disk: IDisk = {
            title, details, album_link, artist, musics, created: newCreated, updated: newUpdated, url_img
        };

        const result = await this._service.update(id, Disk);
        return res.status(200).json(result);
    }

    public async delete(
        req: Request,
        res: Response<IDisk>,
    ) {
        const result = await this._service.delete(req.params.id);
        return res.status(204).json(result);
    }
}