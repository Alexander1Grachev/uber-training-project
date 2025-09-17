import { Request, Response } from 'express';
import { ridesReposytory } from '../../reposytories/rides.repository';
import { mapToRideViewModelUtil } from '../mappers/map-to-ride-view-model.util';
import { HttpStatus } from '../../../core/const/http-statuses';

export async function getRideListHandler(req: Request, res: Response) {
  try {
    const rides = await ridesReposytory.findAll();

    const rideViewModels = rides.map(mapToRideViewModelUtil);
    res.send(rideViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}