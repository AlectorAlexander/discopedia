import { Router } from 'express';
import UserController from '../controllers/UserController';
import DiskModel from '../models/DisksModel';
import UserModel from '../models/UserModel';
import UserService from '../services/UserServices';

const userRoute = Router();

const User = new UserModel();
const userService = new UserService(User);
const UsersController = new UserController(userService);

userRoute.post('/login', UsersController.login);
userRoute.get('/login/validate', UsersController.validate);
userRoute.get('/users', UsersController.findAll);
userRoute.put('/users', UsersController.updateUserDisks);
userRoute.post('/register', UsersController.register);

export default userRoute;