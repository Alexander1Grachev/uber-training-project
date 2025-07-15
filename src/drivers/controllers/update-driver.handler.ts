import { Request, Response } from 'express';
import { db } from '../../db/in-memory.db';
import { DriverInputDto } from '../../drivers/dto/driver.input-dto';
import { HttpStatus } from '../../core/const/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { vehicleInputDtoValidation } from '../../drivers/validation/vehicleInputDtoValidation';
import { driversReposytory } from '../reposytories/drivers.reposytory';

export function updateDriversHandler(
  req: Request<{ id: string }, {}, DriverInputDto>,
  res: Response,
) {
  try {
    const id = parseInt(req.params.id);
    // валидация
    const errors = vehicleInputDtoValidation(req.body);
    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }
    //  если водитель не найден — метод сам выбросит ошибку
    driversReposytory.findById(id);

    // обновление
    driversReposytory.updateById(id, req.body);
    // успешный ответ
    res.sendStatus(HttpStatus.NoContent);
  } catch (error: any) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
      );
  }
}
