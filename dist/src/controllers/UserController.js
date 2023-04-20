"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const DisksServices_1 = __importDefault(require("../services/DisksServices"));
const DisksModel_1 = __importDefault(require("../models/DisksModel"));
const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};
const { JWT_SECRET } = process.env;
class UserController {
    constructor(_service) {
        this._service = _service;
        this.validate = async (req, res, next) => {
            const token = req.headers.authorization;
            const tkn = token || 'fail';
            const { discos, nome, email, error } = this._service.decodedToken(tkn);
            if (!discos || !nome || !email)
                return next(error);
            res.status(http_status_codes_1.StatusCodes.OK).json({ discos });
        };
        this.login = async (req, res, next) => {
            var _a;
            const { email, senha } = req.body;
            const response = await this._service.login(email, senha);
            if (response && response.error)
                return next(response.error);
            const token = (0, jsonwebtoken_1.sign)({
                nome: response.nome,
                email: response.email,
                discos: response.discos,
            }, JWT_SECRET || 'null', jwtConfig);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ token, id: (_a = response._id) === null || _a === void 0 ? void 0 : _a.toString() });
        };
        this.register = async (req, res, next) => {
            var _a;
            const { email, senha, discos, nome } = req.body;
            const response = await this._service.create({ email, senha, discos, nome });
            if (response && response.error)
                return next(response.error);
            const token = (0, jsonwebtoken_1.sign)({
                nome,
                email,
                discos,
            }, JWT_SECRET || 'null', jwtConfig);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({ token, id: (_a = response._id) === null || _a === void 0 ? void 0 : _a.toString() });
        };
        this.findAll = async (req, res) => {
            const response = await this._service.read();
            return res.status(http_status_codes_1.StatusCodes.OK).json({ response });
        };
        this.updateUserDisks = async (req, res) => {
            const { id, diskId } = req.body;
            const response = await this._service.updateUserDisks(id, diskId);
            return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(response);
        };
        this.removeUserDisks = async (req, res) => {
            const { id, diskId } = req.body;
            const response = await this._service.removeUserDisk(id, diskId);
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(response);
        };
        this.findUserDisks = async (req, res) => {
            const { id } = req.body;
            const { discos } = await this._service.readOneById(id);
            const Disk = new DisksModel_1.default();
            const discService = new DisksServices_1.default(Disk);
            const discs = await discService.readMany(discos);
            return res.status(http_status_codes_1.StatusCodes.OK).json(discs);
        };
    }
}
exports.default = UserController;
