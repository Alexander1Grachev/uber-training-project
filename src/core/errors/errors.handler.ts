import { Response } from 'express';
import { ReposytoryNotFoundError } from './repository-not-found.error';
import { HttpStatus } from '../const/http-statuses';
import { createErrorMessages } from '../middelwares/validation/input-validtion-result.middleware';
import { DomainError } from './domain.error';

export function errorsHandler(error: unknown, res: Response): void {
  if (error instanceof ReposytoryNotFoundError) {
    const httpStatus = HttpStatus.NotFound;

    res.status(httpStatus).send(
      createErrorMessages([
        {
          status: httpStatus,
          detail: error.message,
        },
      ]),
    );

    return;
  }

  if (error instanceof DomainError) {
    const httpStatus = HttpStatus.UnprocessableEntity;

    res.status(httpStatus).send(
      createErrorMessages([
        {
          status: httpStatus,
          source: error.source,
          detail: error.message,
          code: error.code,
        },
      ]),
    );

    return;
  }

  res.status(HttpStatus.InternalServerError);
  return;
}
