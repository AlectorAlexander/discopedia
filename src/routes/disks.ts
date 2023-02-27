import { Router } from 'express';
import DiskController from '../controllers/DiskController';
import tokenValidation from '../midlewares/tokenValidation';
import DiskModel from '../models/DisksModel';
import DiskService from '../services/DisksServices';

const diskRoute = Router();

const Disk = new DiskModel();
const diskService = new DiskService(Disk);
const DisksController = new DiskController(diskService);

diskRoute.post('/disks', tokenValidation, (req, res) => DisksController.create(req, res));
diskRoute.get('/disks', tokenValidation, (req, res) => DisksController.read(req, res));
diskRoute.get('/disks/:id', tokenValidation, (req, res) => DisksController.readOne(req, res));
diskRoute.post('/disks/params', tokenValidation, (req, res) => DisksController.readMultiples(req, res));
diskRoute.post('/disks/pagination', tokenValidation, (req, res) => DisksController.readPaginationOnPage(req, res));
diskRoute.put('/disks/:id', tokenValidation, (req, res) => DisksController.update(req, res));
diskRoute.delete('/disks/:id', tokenValidation, (req, res) => DisksController.delete(req, res));

export default diskRoute;