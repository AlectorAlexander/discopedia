"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catalog_1 = require("./../errors/catalog");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const IUser_1 = require("../interfaces/IUser");
const mongoose_1 = require("mongoose");
const DisksServices_1 = __importDefault(require("./DisksServices"));
const DisksModel_1 = __importDefault(require("../models/DisksModel"));
const Disk = new DisksModel_1.default();
const diskService = new DisksServices_1.default(Disk);
const saltRounds = 10;
class UserServices {
    constructor(model) {
        this.login = async (email, senha) => {
            const foundUser = await this.readOne(email);
            const checkPassword = foundUser ? foundUser.senha : 'THISISNOTVALIDPASSWORD';
            const validateUser = bcryptjs_1.default
                .compareSync(senha, checkPassword);
            const error = { status: 401, message: 'Incorrect email or senha' };
            if (!foundUser || !validateUser)
                return { error };
            return foundUser;
        };
        this.decodedToken = (token) => {
            try {
                return (0, jwt_decode_1.default)(token);
            }
            catch (error) {
                return { error };
            }
        };
        this._User = model;
    }
    async create(obj) {
        const parsed = IUser_1.UserZodSchema.safeParse(obj);
        if (parsed.success === false) {
            throw parsed.error;
        }
        const { email, senha, discos, nome } = obj;
        const findInfo = await this._User.readOneByEmail(email);
        if (findInfo)
            return { error: { message: 'User already registered', status: 409 } };
        const newSenha = await bcryptjs_1.default.hash(senha, saltRounds);
        const response = await this._User.create({ email, senha: newSenha, discos, nome });
        return response;
    }
    async read() {
        const User = await this._User.read();
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return User;
    }
    async readOne(email) {
        const User = await this._User.readOneByEmail(email);
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return User;
    }
    async readMany(ids) {
        const User = await this._User.readMany(ids);
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return User;
    }
    async readOneById(_id) {
        const User = await this._User.readOne(_id);
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return User;
    }
    async update(id, obj) {
        const User = await this._User.update(id, obj);
        const parsed = IUser_1.UserZodSchema.safeParse(obj);
        if (parsed.success === false) {
            throw parsed.error;
        }
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return User;
    }
    async delete(id) {
        const User = await this._User.delete(id);
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return User;
    }
    async updateUserDisks(id, diskId) {
        const User = await this._User.readOne(id);
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        const Disk = await diskService.readOne(diskId);
        if (!Disk)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        const DiskUser = await this._User.readOneByDisco(diskId, id);
        if (DiskUser && DiskUser.discos.length) {
            throw new mongoose_1.Error(catalog_1.ErrorTypes.uAlreadyHaveIt);
        }
        const response = await this._User.updateOneDisk(id, diskId);
        if (!response)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return response;
    }
    async removeUserDisk(id, diskId) {
        const User = await this._User.readOne(id);
        if (!User)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        const Disk = await diskService.readOne(diskId);
        if (!Disk)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        const DiskUser = await this._User.readOneByDisco(diskId, id);
        if (!DiskUser)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        const response = await this._User.removeOneDisk(id, diskId);
        if (!response)
            throw new mongoose_1.Error(catalog_1.ErrorTypes.EntityNotFound);
        return response;
    }
}
exports.default = UserServices;
