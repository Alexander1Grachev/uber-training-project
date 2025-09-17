import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/const/http-statuses';
import { DRIVERS_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { DriverViewModel } from '../../../src/drivers/types/driver-view-model';

export async function getDriverById(
    app: Express,
    driverId: string,
): Promise<DriverViewModel> {
    console.log(`🔍 Searching for driver with ID: ${driverId}`);

    const driverResponse = await request(app)
        .get(`${DRIVERS_PATH}/${driverId}`)
        .set('Authorization', generateBasicAuthToken())
        .expect(HttpStatus.Ok);

    console.log(`✅ Driver found: ${driverResponse.body.name}`);
    return driverResponse.body;
}