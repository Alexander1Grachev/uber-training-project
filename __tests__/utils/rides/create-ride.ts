// @ts-ignore
import request from 'supertest';
import { HttpStatus } from '../../../src/core/const/http-statuses';
import { Express } from 'express';
import { RideInputDto } from '../../../src/rides/dto/ride-input.dto';
import { createDriver } from '../drivers/create-driver';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { RIDES_PATH } from '../../../src/core/paths/paths';
import { getRideDto } from './get-ride-dto';
import { RideViewModel } from '../../../src/rides/types/ride-view-model';

export async function createRide(
    app: Express,
    rideDto?: RideInputDto,
): Promise<RideViewModel> {
    console.log('🚕 Creating driver for ride...');
    const driver = await createDriver(app);
    console.log('✅ Driver created for ride:', driver.id);

    const defaultRideData = getRideDto(driver.id);
    const testRideData = { ...defaultRideData, ...rideDto };

    console.log('🚖 Creating ride for driver:', driver.id);
    const createdRideResponse = await request(app)
        .post(RIDES_PATH)
        .set('Authorization', generateBasicAuthToken())
        .send(testRideData)
        .expect(HttpStatus.Created);

    console.log('✅ Ride created with ID:', createdRideResponse.body.id);
    return createdRideResponse.body;
}