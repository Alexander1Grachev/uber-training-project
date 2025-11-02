import { Request, Response } from 'express';
import { DriverUpdateInput } from '../../routes/input/driver-update.input';
import { HttpStatus } from '../../../core/const/http-statuses';
import { driversService } from '../../application/drivers.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export async function updateDriverHandler(
  req: Request<{ id: string }, {}, DriverUpdateInput>,
  res: Response,
) {
  try {
    const id = req.params.id;
    driversService.update(id, req.body.data.attributes);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
