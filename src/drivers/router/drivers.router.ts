import { Router } from 'express';
import { driversController } from '../../drivers/controllers/drivers.controller';

export const driversRouter = Router();

driversRouter.post('/', driversController.create);
driversRouter.get('/', driversController.getList);
driversRouter.get('/:id', driversController.getOne);
driversRouter.put('/:id', driversController.update);
driversRouter.delete('/:id', driversController.delete);
