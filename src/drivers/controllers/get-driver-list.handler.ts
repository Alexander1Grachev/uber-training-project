import { HttpStatus } from '../../core/const/http-statuses';
import { driversReposytory } from '../reposytories/drivers.reposytory';
import { createErrorMessages } from '../../core/utils/error.utils';
import { Request, Response } from 'express';

export function getDriversListHandler(req: Request, res: Response) {
  const drivers = driversReposytory.findAll();
  res.status(HttpStatus.Ok).send(drivers);
}
