import express, { Express, Request, Response } from 'express';
import { db } from '../../db/in-memory.db';
import { Driver } from '../../drivers/types/driver';
import { HttpStatus } from '../../core/const/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { vehicleInputDtoValidation } from '../../drivers/validation/vehicleInputDtoValidation';
// возвращаем всех водителей
export const getDrivers = (req: Request, res: Response) => {
  res.status(200).send(db.drivers);
};

// ищем водителя в бд по id
export const getDriversById = (req: Request, res: Response) => {
  const driver = db.drivers.find((d) => d.id === +req.params.id);
  // возвращаем ответ
  res.status(200).send(driver);
};

//2) создаем Driver
export const createDrivers = (req: Request, res: Response) => {
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
  db.drivers.push(newDriver);
  res.status(HttpStatus.Created).send(newDriver);
};
//3) обновляем Driver
export const updateDriversById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = db.drivers.findIndex((v) => v.id === id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
      );
    return;
  }
  // валидация
  const errors = vehicleInputDtoValidation(req.body);
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  const driver = db.drivers[index];

  driver.name = req.body.name;
  driver.phoneNumber = req.body.phoneNumber;
  driver.email = req.body.email;
  driver.vehicleMake = req.body.vehicleMake;
  driver.vehicleModel = req.body.vehicleModel;
  driver.vehicleYear = req.body.vehicleYear;
  driver.vehicleLicensePlate = req.body.vehicleLicensePlate;
  driver.vehicleDescription = req.body.vehicleDescription;
  driver.vehicleFeatures = req.body.vehicleFeatures;

  res.sendStatus(HttpStatus.NoContent);
};
//3) удаляем Driver
export const deleteDriversById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  //ищет первый элемент, у которого функция внутри возвращает true и возвращает индекс этого элемента в массиве, если id ни у кого не совпал, то findIndex вернёт -1.
  const index = db.drivers.findIndex((v) => v.id === id);

  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
      );
    return;
  }

  db.drivers.splice(index, 1);
  res.sendStatus(HttpStatus.NoContent);
};
