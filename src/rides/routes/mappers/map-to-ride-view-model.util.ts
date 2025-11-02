import { WithId } from 'mongodb';
import { Ride } from '../../domain/ride';
import { RideOutput } from '../output/ride.output';
import { ResourceType } from '../../../core/types/resource-type';

export function mapToRideOutputUtil(ride: WithId<Ride>): RideOutput {
  return {
    data: {
      type: ResourceType.Rides,
      id: ride._id.toString(),
      attributes: {
        clientName: ride.clientName,
        driver: ride.driver,
        vehicle: ride.vehicle,
        price: ride.price,
        currency: ride.currency,
        startedAt: ride.startedAt,
        finishedAt: ride.finishedAt,
        addresses: ride.addresses,
      },
    },
  };
}
