import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/const/http-statuses';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { ridesService } from '../../application/rides.service';

export async function finishRideHandler(
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) {
  try {
    const id = req.params.id;
    await ridesService.finishRide(id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
