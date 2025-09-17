import { Request, Response } from 'express';
import { RideInputDto } from '../../dto/ride-input.dto';
import { driversReposytory } from '../../../drivers/reposytories/drivers.reposytory';
import { HttpStatus } from '../../../core/const/http-statuses';
import { createErrorMessages } from '../../../core/middelwares/validation/input-validtion-result.middleware';
import { ridesReposytory } from '../../reposytories/rides.repository';
import { Ride } from '../../types/ride';
import { mapToRideViewModelUtil } from '../mappers/map-to-ride-view-model.util';

export async function createRideHandler(
  req: Request<{}, {}, RideInputDto>,
  res: Response,
) {
  try {
    const driverId = req.body.driverId;

    const driver = await driversReposytory.findById(driverId);

    if (!driver) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
        );

      return;
    }

    // Если у водителя сейчас есть заказ, то создать новую поездку нельзя
    const activeRide = await ridesReposytory.findActiveRideByDriverId(driverId);

    if (activeRide) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([
            { field: 'status', message: 'The driver is currently on a job' },
          ]),
        );

      return;
    }

    const newRide: Ride = {
      clientName: req.body.clientName,
      driver: {
        id: req.body.driverId,
        name: driver.name,
      },
      vehicle: {
        licensePlate: driver.vehicle.licensePlate,
        name: `${driver.vehicle.make} ${driver.vehicle.model}`,
      },
      price: req.body.price,
      currency: req.body.currency,
      createdAt: new Date(),
      updatedAt: null,
      startedAt: new Date(),
      finishedAt: null,
      addresses: {
        from: req.body.fromAddress,
        to: req.body.toAddress,
      },
    };

    const createdRide = await ridesReposytory.createRide(newRide);

    const rideViewModel = mapToRideViewModelUtil(createdRide);

    res.status(HttpStatus.Created).send(rideViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}