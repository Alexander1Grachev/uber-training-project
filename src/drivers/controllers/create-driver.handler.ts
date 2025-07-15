import express, { Express, Request, Response } from 'express';
import { db } from '../../db/in-memory.db';
import { Driver } from '../../drivers/types/driver';
import { DriverInputDto } from '../../drivers/dto/driver.input-dto';
import { HttpStatus } from '../../core/const/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { vehicleInputDtoValidation } from '../../drivers/validation/vehicleInputDtoValidation';
import { driversReposytory } from '../reposytories/drivers.reposytory';
//2) создаем Driver
export function createDriversHandler(
  req: Request<{}, {}, DriverInputDto>,
  res: Response,
) {
  const errors = vehicleInputDtoValidation(req.body);

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  const newDriver: Driver = {
    id: +new Date(),
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleModel: req.body.vehicleModel,
    vehicleYear: req.body.vehicleYear,
    vehicleLicensePlate: req.body.vehicleLicensePlate,
    vehicleDescription: req.body.vehicleDescription,
    vehicleFeatures: req.body.vehicleFeatures,
    createdAt: new Date(),
  };
  //3) добавляем newDriver в БД
  driversReposytory.create(newDriver);
  res.status(HttpStatus.Created).send(newDriver);
}
