import { IDisk, DiskZodSchema } from './../interfaces/IDisks';
import { IService } from '../interfaces/IServices';
import { IModel } from '../interfaces/IModel';

enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

class ProdutoService implements IService<IDisk> {
    private _Produto:IModel<IDisk>;

    constructor(model:IModel<IDisk>) {
        this._Produto = model;
    }

    public async create(obj:unknown):Promise<IDisk> {
        const parsed = DiskZodSchema.safeParse(obj);
    
        if (parsed.success === false) {
            throw parsed.error;
        }
        const result = await this._Produto.create(parsed.data);
        return result;
    }

    public async read():Promise<IDisk[]> {
        const Produto = await this._Produto.read();
        if (!Produto) throw new Error(ErrorTypes.EntityNotFound);
        return Produto;
    }

    public async readOne(_id:string):Promise<IDisk> {
        const Produto = await this._Produto.readOne(_id);
        if (!Produto) throw new Error(ErrorTypes.EntityNotFound);
        return Produto;
    }

    public async update(id:string, obj: IDisk | object):Promise<IDisk> {
        const Produto = await this._Produto.update(id, obj);
        const parsed = DiskZodSchema.safeParse(obj);
        if (parsed.success === false) {
            throw parsed.error;
        }
        if (!Produto) throw new Error(ErrorTypes.EntityNotFound);
        return Produto;
    }

    public async delete(id:string):Promise<IDisk> {
        const Produto = await this._Produto.delete(id);
        if (!Produto) throw new Error(ErrorTypes.EntityNotFound);
        return Produto;
    }
}

export default ProdutoService;