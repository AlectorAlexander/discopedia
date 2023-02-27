import { Router } from 'express';
import UserController from '../controllers/UserController';
import tokenValidation from '../midlewares/tokenValidation';
import UserModel from '../models/UserModel';
import UserService from '../services/UserServices';

const userRoute = Router();

const User = new UserModel();
const userService = new UserService(User);
const UsersController = new UserController(userService);

userRoute.post('/login', UsersController.login);
userRoute.get('/login/validate', UsersController.validate);
userRoute.get('/users', tokenValidation, UsersController.findAll);
userRoute.post('/user/disc', tokenValidation, UsersController.findUserDisks);
userRoute.delete('/user/disc', tokenValidation, UsersController.removeUserDisks);
userRoute.put('/user/disc', tokenValidation, UsersController.updateUserDisks);
userRoute.post('/register', UsersController.register);

export default userRoute;