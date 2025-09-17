import { HttpStatus } from '../../../core/const/http-statuses';
import { driversReposytory } from '../../reposytories/drivers.reposytory';
import { Request, Response } from 'express';
import { mapToDriverViewModel } from '../mappers/map-to-driver-view-model.util';

export async function getDriverListHandler(req: Request, res: Response) {
  try {
    const drivers = await driversReposytory.findAll();
    const driverViewModels = drivers.map(mapToDriverViewModel);
    res.send(driverViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}