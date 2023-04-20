"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const { JWT_SECRET } = process.env;
const SECRET = JWT_SECRET || 'null';
const User = new UserModel_1.default();
const tokenValidation = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ message: 'Token not found' });
    try {
        const data = jwt.verify(token, SECRET);
        const { email } = data;
        const user = await User.readOneByEmail(email);
        if (user)
            return next();
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    catch (e) {
        const itsTokenError = e.message.includes('jwt malformed')
            || e.message.includes('Unexpected token');
        if (itsTokenError) {
            return next({ message: 'Token must be a valid token', status: 401 });
        }
        return next(e);
    }
};
exports.default = tokenValidation;
