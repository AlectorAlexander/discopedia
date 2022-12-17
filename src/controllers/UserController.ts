import { IUser } from './../interfaces/IUser';
import { IServiceUsers } from './../interfaces/IServices';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class UserController {
    constructor(private _service: IServiceUsers<IUser>) { }

    public validate = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        const tkn = token || 'fail';
        const { discos, nome, email, error } = this._service.decodedToken(tkn);

        if (!discos || !nome || !email) return next(error);

        res.status(StatusCodes.OK).json({ discos });
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, senha } = req.body;

        const response = await this._service.login(email, senha);
    

        if (typeof response === 'object') return next(response);

        return res.status(StatusCodes.OK).json({ token: response });
    };

    public register = async  (req: Request, res: Response, next: NextFunction) => {
        const { email, senha, discos, nome } = req.body;
    
    
        const response = await this._service.create({email, senha, discos, nome});

        
    
        if (typeof response === 'object') return next(response.error);

        return res.status(StatusCodes.CREATED).json({ token: response });
    };


    public findAll = async  (req: Request, res: Response) => {
        const response = await this._service.read();

        return res.status(StatusCodes.OK).json({ response });
    };

    public updateUserDisks = async  (req: Request, res: Response) => {
        
        const { id, diskId } = req.body;
    
    
        const response = await this._service.updateUserDisks(
            id, diskId
        );
    

        return res.status(StatusCodes.ACCEPTED).json(response);
    };


}
