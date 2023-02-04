import * as dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
import diskRoute from './routes/disks';
import userRoute from './routes/users';
import cors from 'cors';
import errorHandler from './errors/error';
import 'module-alias/register';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(diskRoute);
app.use(errorHandler);

export default app;