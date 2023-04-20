"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const tokenValidation_1 = __importDefault(require("../midlewares/tokenValidation"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserServices_1 = __importDefault(require("../services/UserServices"));
const userRoute = (0, express_1.Router)();
const User = new UserModel_1.default();
const userService = new UserServices_1.default(User);
const UsersController = new UserController_1.default(userService);
userRoute.post('/login', UsersController.login);
userRoute.get('/login/validate', UsersController.validate);
userRoute.get('/users', tokenValidation_1.default, UsersController.findAll);
userRoute.post('/user/disc', tokenValidation_1.default, UsersController.findUserDisks);
userRoute.put('/user/discDelete', UsersController.removeUserDisks);
userRoute.put('/user/disc', tokenValidation_1.default, UsersController.updateUserDisks);
userRoute.post('/register', UsersController.register);
exports.default = userRoute;
