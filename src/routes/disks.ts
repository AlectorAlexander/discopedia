import { Router } from 'express';
import DiskController from '../controllers/DiskController';
import DiskModel from '../models/DisksModel';
import DiskService from '../services/DisksServices';

const diskRoute = Router();

const Disk = new DiskModel();
const diskService = new DiskService(Disk);
const DisksController = new DiskController(diskService);

diskRoute.post('/disks', (req, res) => DisksController.create(req, res));
diskRoute.get('/disks', (req, res) => DisksController.read(req, res));
diskRoute.get('/disks/:id', (req, res) => DisksController.readOne(req, res));
diskRoute.put('/disks/:id', (req, res) => DisksController.update(req, res));
diskRoute.delete('/disks/:id', (req, res) => DisksController.delete(req, res));

export default diskRoute;