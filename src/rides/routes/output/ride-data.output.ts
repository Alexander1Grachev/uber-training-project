import { ResourceType } from '../../../core/types/resource-type';
import { Currency } from '../../domain/ride';

export type RideDataOutput = {
  type: ResourceType.Rides;
  id: string;
  attributes: {
    clientName: string;
    driver: {
      id: string;
      name: string;
    };
    vehicle: {
      licensePlate: string;
      name: string;
    };
    price: number;
    currency: Currency;

    startedAt: Date | null;
    finishedAt: Date | null;
    addresses: {
      from: string;
      to: string;
    };
  };
};
