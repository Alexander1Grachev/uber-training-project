import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/const/http-statuses';
import { getDriverDto } from './get-driver-dto';
import { DRIVERS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { DriverUpdateInput } from '../../../src/drivers/routes/input/driver-update.input';
import { ResourceType } from '../../../src/core/types/resource-type';
import { DriverAttributes } from '../../../src/drivers/application/dtos/driver-attributes';

export async function updateDriver(
  app: Express,
  driverId: string,
  driverDto?: DriverAttributes,
): Promise<void> {
  const testDriverData: DriverUpdateInput = {
    data: {
      type: ResourceType.Drivers,
      id: driverId,
      attributes: { ...getDriverDto(), ...driverDto },
    },
  };

  const updatedDriverResponse = await request(app)
    .put(`${DRIVERS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.NoContent);

  return updatedDriverResponse.body;
}
