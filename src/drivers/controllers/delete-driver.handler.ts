import { Request, Response } from 'express';
import { HttpStatus } from '../../core/const/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { driversReposytory } from '../reposytories/drivers.reposytory';
import { db } from '../../db/in-memory.db';

export function deleteDriversHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    driversReposytory.delete(id); // внутри проверка, если нет — кинет ошибку
    res.sendStatus(HttpStatus.NoContent);
  } catch (error: any) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
      );
  }
}
