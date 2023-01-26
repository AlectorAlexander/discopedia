import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserModel from '../models/UserModel';
import UserService from '../services/UserServices';

const userRoute = Router();

const User = new UserModel();
const userService = new UserService(User);
const UsersController = new UserController(userService);

userRoute.post('/login', UsersController.login);
userRoute.get('/login/validate', UsersController.validate);
userRoute.get('/users', UsersController.findAll);
userRoute.post('/user/disc', UsersController.findUserDisks);
userRoute.delete('/user/disc', UsersController.removeUserDisks);
userRoute.put('/user/disc', UsersController.updateUserDisks);
userRoute.post('/register', UsersController.register);

export default userRoute;