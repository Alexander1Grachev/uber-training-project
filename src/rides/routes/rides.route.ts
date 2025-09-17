import { Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middelwares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middelewares/super-admin.guard-middleware';
import { idValidation } from '../../core/middelwares/validation/params-id.validation-middleware';
import { rideInputDtoValidation } from '../routes/validation/ride.input-dto.validation-middleware';
import { createRideHandler } from './handlers/create-ride.handler';
import { getRideListHandler } from './handlers/get-ride-list.handler';
import { getRideHandler } from './handlers/get-ride.handler';
import { finishRideHandler } from './handlers/finish-ride.handler';

export const ridesRoute = Router({});

ridesRoute.use(superAdminGuardMiddleware);

ridesRoute.get('', getRideListHandler);

ridesRoute.get(
    '/:id',
    idValidation,
    inputValidationResultMiddleware,
    getRideHandler,
);

ridesRoute.post(
    '',
    rideInputDtoValidation,
    inputValidationResultMiddleware,
    createRideHandler,
);

ridesRoute.post(
    '/:id/actions/finish',
    idValidation,
    inputValidationResultMiddleware,
    finishRideHandler,
);