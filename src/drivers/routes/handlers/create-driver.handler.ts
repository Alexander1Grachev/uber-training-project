import { Request, Response } from 'express';
import { Driver } from '../../types/driver';
import { DriverInputDto } from '../../dto/driver.input-dto';
import { HttpStatus } from '../../../core/const/http-statuses';
import { driversReposytory } from '../../reposytories/drivers.reposytory';
import { mapToDriverViewModel } from '../mappers/map-to-driver-view-model.util';

export async function createDriverHandler(
  req: Request<{}, {}, DriverInputDto>,
  res: Response,
) {
  try {
    const newDriver: Driver = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      vehicle: {
        make: req.body.vehicleMake,
        model: req.body.vehicleModel,
        year: req.body.vehicleYear,
        licensePlate: req.body.vehicleLicensePlate,
        description: req.body.vehicleDescription,
        features: req.body.vehicleFeatures,
      },
      createdAt: new Date(),
    };

    const createdDriver = await driversReposytory.create(newDriver);
    const driverViewModel = mapToDriverViewModel(createdDriver);
    res.status(HttpStatus.Created).send(driverViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}