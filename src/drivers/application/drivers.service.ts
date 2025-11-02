import { Driver } from '../domain/driver';
import { DriverAttributes } from './dtos/driver-attributes';
import { WithId } from 'mongodb';
import { driversReposytory } from '../reposytories/drivers.reposytory';
import { ridesReposytory } from '../../rides/reposytories/rides.repository';
import { DomainError } from '../../core/errors/domain.error';
import { DriverQueryInput } from '../routes/input/driver-query.input';

export enum DriverErrorCode {
  HasActiveRide = 'DRIVER_HAS_ACTIVE_RIDE',
}
export const driversService = {
  async findMany(
    queryDto: DriverQueryInput,
  ): Promise<{ items: WithId<Driver>[]; totalCount: number }> {
    return driversReposytory.findMany(queryDto);
  },

  async findByIdOrFail(id: string): Promise<WithId<Driver>> {
    return driversReposytory.findByIdOrFail(id);
  },

  async create(dto: DriverAttributes): Promise<string> {
    const newDriver: Driver = {
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      vehicle: {
        make: dto.vehicleMake,
        model: dto.vehicleModel,
        year: dto.vehicleYear,
        licensePlate: dto.vehicleLicensePlate,
        description: dto.vehicleDescription,
        features: dto.vehicleFeatures,
      },
      createdAt: new Date(),
    };

    return driversReposytory.create(newDriver);
  },

  async update(id: string, dto: DriverAttributes): Promise<void> {
    await driversReposytory.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    const activeRide = await ridesReposytory.findActiveRideByDriverId(id);

    if (activeRide) {
      throw new DomainError(
        `Driver has an active ride. Complete or cancel the ride first`,
        DriverErrorCode.HasActiveRide,
      );
    }
    await driversReposytory.delete(id);
    return;
  },
};
