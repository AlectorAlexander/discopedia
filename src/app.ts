import * as dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
import diskRoute from './routes/disks';
import cors from 'cors';
import errorHandler from './errors/error';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(diskRoute);
app.use(errorHandler);

export default app;