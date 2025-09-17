import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/const/http-statuses';
import { createErrorMessages } from '../../../core/middelwares/validation/input-validtion-result.middleware';
import { ridesReposytory } from '../../reposytories/rides.repository';

export async function finishRideHandler(
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) {
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

    if (ride.finishedAt) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([
            { field: 'id', message: 'Ride already finished' },
          ]),
        );

      return;
    }

    await ridesReposytory.finishedRide(id, new Date());

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}