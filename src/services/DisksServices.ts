import { IDisk, DiskZodSchema } from './../interfaces/IDisks';
import { IService } from '../interfaces/IServices';
import { IModel } from '../interfaces/IModel';

enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

class DiskService implements IService<IDisk> {
    private _Disk:IModel<IDisk>;

    constructor(model:IModel<IDisk>) {
        this._Disk = model;
    }

    public async create(obj:unknown):Promise<IDisk> {
        const parsed = DiskZodSchema.safeParse(obj);
    
        if (parsed.success === false) {
            throw parsed.error;
        }
        const result = await this._Disk.create(parsed.data);
        return result;
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