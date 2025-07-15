import { Request, Response } from 'express';
import { HttpStatus } from '../../core/const/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { driversReposytory } from '../reposytories/drivers.reposytory';

export function getDriversHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const driver = driversReposytory.findById(id);

  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
      );
    return;
  }
  // возвращаем ответ
  res.status(HttpStatus.Ok).send(driver);
}
