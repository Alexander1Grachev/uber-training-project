import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/const/http-statuses';
import { driversService } from '../../application/drivers.service';
import { mapToDriverOutput } from '../mappers/map-to-driver-output.util';
import { errorsHandler } from '../../../core/errors/errors.handler';

export async function getDriverHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const driver = await driversService.findByIdOrFail(id);

    const driverViewModel = mapToDriverOutput(driver);
    res.status(HttpStatus.Ok).send(driverViewModel);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
