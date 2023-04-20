"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiskController {
    constructor(_service) {
        this._service = _service;
    }
    async create(req, res) {
        const { title, details, artist, musics, created, updated, url_img, album_link } = req.body;
        const newCreated = new Date(created);
        const newUpdated = new Date(updated);
        const Disk = {
            title, details, album_link, artist, musics, created: newCreated, updated: newUpdated, url_img
        };
        const results = await this._service.create(Disk);
        return res.status(201).json(results);
    }
    async read(req, res) {
        const result = await this._service.read();
        return res.status(200).json(result);
    }
    async readOne(req, res) {
        const result = await this._service.readOne(req.params.id);
        return res.status(200).json(result);
    }
    async readPaginationOnPage(req, res) {
        const { page, limit } = req.body;
        const result = await this._service.readPaginationpage(page, limit);
        return res.status(200).json(result);
    }
    async readMultiples(req, res) {
        const { params } = req.body;
        const result = await this._service.readMultiple(params);
        return res.status(200).json(result);
    }
    async update(req, res) {
        const { title, details, artist, album_link, musics, created, updated, url_img } = req.body;
        const { id } = req.params;
        const newCreated = new Date(created);
        const newUpdated = new Date(updated);
        const Disk = {
            title, details, album_link, artist, musics, created: newCreated, updated: newUpdated, url_img
        };
        const result = await this._service.update(id, Disk);
        return res.status(200).json(result);
    }
    async delete(req, res) {
        const result = await this._service.delete(req.params.id);
        return res.status(204).json(result);
    }
}
exports.default = DiskController;
