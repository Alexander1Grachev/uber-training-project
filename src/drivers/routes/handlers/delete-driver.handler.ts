import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/const/http-statuses';
import { createErrorMessages } from '../../../core/middelwares/validation/input-validtion-result.middleware';
import { driversReposytory } from '../../reposytories/drivers.reposytory';
import { ridesReposytory } from '../../../rides/reposytories/rides.repository';

export async function deleteDriverHandler(req: Request, res: Response) {
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

    // Если у водителя сейчас есть заказ, то удалить его нельзя
    const activeRide = await ridesReposytory.findActiveRideByDriverId(id);
    if (activeRide) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([
            { field: 'status', message: 'The driver is currently on a job' },
          ]),
        );
      return;
    }

    await driversReposytory.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}