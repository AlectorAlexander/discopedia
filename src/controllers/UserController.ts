import { IUser } from './../interfaces/IUser';
import { IServiceUsers } from './../interfaces/IServices';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign, SignOptions } from 'jsonwebtoken';
import DiskService from '../services/DisksServices';
import DiskModel from '../models/DisksModel';

const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const { JWT_SECRET } = process.env;


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
    

        if (response && response.error) return next(response.error);

        const token = sign({
            nome: response.nome,
            email: response.email,
            discos: response.discos,
        }, JWT_SECRET || 'null', jwtConfig);

        return res.status(StatusCodes.OK).json({ token, id: response._id?.toString() });
    };

    public register = async  (req: Request, res: Response, next: NextFunction) => {
        console.log('cham');
        
        const { email, senha, discos, nome } = req.body;
    
    
        const response = await this._service.create({email, senha, discos, nome});

    
        if (response && response.error) return next(response.error);

        const token = sign({
            nome,
            email,
            discos,
        }, JWT_SECRET || 'null', jwtConfig);

        return res.status(StatusCodes.CREATED).json({ token, id: response._id?.toString() });
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

    public removeUserDisks = async (req: Request, res: Response) => {
        const { id, diskId } = req.body;
        
        const response = await this._service.removeUserDisk(
            id, diskId
        );
    
        return res.status(StatusCodes.NO_CONTENT).json(response);
    };
    

    public findUserDisks = async  (req: Request, res: Response) => {
        
        const { id } = req.body;
    
    
        const { discos } = await this._service.readOneById(
            id
        );

        const Disk = new DiskModel();
        const discService = new DiskService(Disk);

        const discs = await discService.readMany(discos);

            
        return res.status(StatusCodes.OK).json(discs);
    };


}
