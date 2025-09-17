import { Request, Response } from 'express';
import { ridesReposytory } from '../../reposytories/rides.repository';
import { HttpStatus } from '../../../core/const/http-statuses';
import { createErrorMessages } from '../../../core/middelwares/validation/input-validtion-result.middleware';
import { mapToRideViewModelUtil } from '../mappers/map-to-ride-view-model.util';

export async function getRideHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const ride = await ridesReposytory.findById(id);

    if (!ride) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Ride not found' }]),
        );

      return;
    }

    const rideViewModel = mapToRideViewModelUtil(ride);

    res.send(rideViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}