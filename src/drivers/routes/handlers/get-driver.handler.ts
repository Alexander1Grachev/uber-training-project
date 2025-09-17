import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/const/http-statuses';
import { createErrorMessages } from '../../../core/middelwares/validation/input-validtion-result.middleware';
import { driversReposytory } from '../../reposytories/drivers.reposytory';
import { mapToDriverViewModel } from '../mappers/map-to-driver-view-model.util';

export async function getDriverHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const driver = await driversReposytory.findById(id);

    if (!driver) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
        );

      return;
    }

    const driverViewModel = mapToDriverViewModel(driver);
    res.status(HttpStatus.Ok).send(driverViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}