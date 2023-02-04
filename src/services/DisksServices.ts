import { ErrorTypes } from './../errors/catalog';
import { IDisk, DiskZodSchema } from './../interfaces/IDisks';
import { IServiceDisks } from '../interfaces/IServices';
import { IModel } from '../interfaces/IModel';


class DiskService implements IServiceDisks<IDisk> {
    private _Disk:IModel<IDisk>;

    constructor(model:IModel<IDisk>) {
        this._Disk = model;
    }

    public async create(obj:IDisk):Promise<IDisk> {
        const parsed = DiskZodSchema.safeParse(obj);
    
        if (parsed.success === false) {
            throw parsed.error;
        }
        const result = await this._Disk.create(parsed.data);
        return result;
    }

    public async readMany(ids: string[]): Promise<IDisk[] | null> {
        const Disc = await this._Disk.readMany(ids);
        if (!Disc) throw new Error(ErrorTypes.EntityNotFound);
        return Disc;
    }

    public async readPaginationpage(page: number, limit: number): Promise<IDisk[]> {
        const Discs = await this._Disk.readPagination(page, limit);
        if (!Discs) throw new Error(ErrorTypes.EntityNotFound);
        return Discs;
    }

    public async read():Promise<IDisk[]> {
        const Disk = await this._Disk.read();
        if (!Disk) throw new Error(ErrorTypes.EntityNotFound);
        return Disk;
    }

    public async readOne(_id:string):Promise<IDisk> {
        const Disk = await this._Disk.readOne(_id);
        if (!Disk) throw new Error(ErrorTypes.EntityNotFound);
        return Disk;
    }

    public async readMultiple(params: Record<string, any>):Promise<IDisk[]> {
        const Disk = await this._Disk.readMultiple(params);
        if (!Disk) throw new Error(ErrorTypes.EntityNotFound);
        return Disk;
    }

    public async update(id:string, obj: IDisk | object):Promise<IDisk> {
        const Disk = await this._Disk.update(id, obj);
        const parsed = DiskZodSchema.safeParse(obj);
        if (parsed.success === false) {
            throw parsed.error;
        }
        if (!Disk) throw new Error(ErrorTypes.EntityNotFound);
        return Disk;
    }

    public async delete(id:string):Promise<IDisk> {
        const Disk = await this._Disk.delete(id);
        if (!Disk) throw new Error(ErrorTypes.EntityNotFound);
        return Disk;
    }
}

export default DiskService;