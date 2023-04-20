"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catalog_1 = require("./../errors/catalog");
const IDisks_1 = require("./../interfaces/IDisks");
class DiskService {
    constructor(model) {
        this._Disk = model;
    }
    async create(obj) {
        const parsed = IDisks_1.DiskZodSchema.safeParse(obj);
        if (parsed.success === false) {
            throw parsed.error;
        }
        const result = await this._Disk.create(parsed.data);
        return result;
    }
    async readMany(ids) {
        const Disc = await this._Disk.readMany(ids);
        if (!Disc)
            throw new Error(catalog_1.ErrorTypes.EntityNotFound);
        return Disc;
    }
    async readPaginationpage(page, limit) {
        const Discs = await this._Disk.readPagination(page, limit);
        if (!Discs)
            throw new Error(catalog_1.ErrorTypes.EntityNotFound);
        return Discs;
    }
    async read() {
        const Disk = await this._Disk.read();
        if (!Disk)
            throw new Error(catalog_1.ErrorTypes.EntityNotFound);
        return Disk;
    }
    async readOne(_id) {
        const Disk = await this._Disk.readOne(_id);
        if (!Disk)
            throw new Error(catalog_1.ErrorTypes.EntityNotFound);
        return Disk;
    }
    async readMultiple(params) {
        const Disk = await this._Disk.readMultiple(params);
        if (!Disk)
            throw new Error(catalog_1.ErrorTypes.EntityNotFound);
        return Disk;
    }
    async update(id, obj) {
        const Disk = await this._Disk.update(id, obj);
        const parsed = IDisks_1.DiskZodSchema.safeParse(obj);
        if (parsed.success === false) {
            throw parsed.error;
        }
        if (!Disk)
            throw new Error(catalog_1.ErrorTypes.EntityNotFound);
        return Disk;
    }
    async delete(id) {
        const Disk = await this._Disk.delete(id);
        if (!Disk)
            throw new Error(catalog_1.ErrorTypes.EntityNotFound);
        return Disk;
    }
}
exports.default = DiskService;
