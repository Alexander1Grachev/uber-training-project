import { Router } from 'express';
import {
  createDrivers,
  deleteDriversById,
  getDrivers,
  getDriversById,
  updateDriversById,
} from '../../drivers/controllers/drivers.controller';

export const driversRouter = Router();

driversRouter.get('/:id', getDriversById);
driversRouter.put('/:id', updateDriversById);
driversRouter.delete('/:id', deleteDriversById);

driversRouter.get('/', getDrivers);
driversRouter.post('/', createDrivers);
