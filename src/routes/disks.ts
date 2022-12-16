import { Router } from 'express';
import DiskController from '../controllers/DiskController';
import DiskModel from '../models/DisksModel';
import DiskService from '../services/DisksServices';

const DiskRoute = Router();

const Disk = new DiskModel();
const diskService = new DiskService(Disk);
const DisksController = new DiskController(diskService);

DiskRoute.post('/Disks', (req, res) => DisksController.create(req, res));
DiskRoute.get('/Disks', (req, res) => DisksController.read(req, res));
DiskRoute.get('/Disks/:id', (req, res) => DisksController.readOne(req, res));
DiskRoute.put('/Disks/:id', (req, res) => DisksController.update(req, res));
DiskRoute.delete('/Disks/:id', (req, res) => DisksController.delete(req, res));

export default DiskRoute;