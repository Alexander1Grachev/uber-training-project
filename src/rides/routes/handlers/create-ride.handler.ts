import { Request, Response } from 'express';
import { RideCreateInput } from '../input/ride-create.input';
import { HttpStatus } from '../../../core/const/http-statuses';
import { mapToRideOutputUtil } from '../mappers/map-to-ride-view-model.util';
import { ridesService } from '../../application/rides.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export async function createRideHandler(
  req: Request<{ driverId: string }, {}, RideCreateInput>,
  res: Response,
) {
  try {
    const createdRideId = await ridesService.create(req.body.data.attributes);

    const createdRide = await ridesService.findByIdOrFail(createdRideId);

    const rideOutput = mapToRideOutputUtil(createdRide);

    res.status(HttpStatus.Created).send(rideOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
