// @ts-ignore
import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/const/http-statuses';
import { RIDES_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { RideViewModel } from '../../../src/rides/types/ride-view-model';
export async function getRideById<R = RideViewModel>(
    app: Express,
    rideId: string,
    expectedStatus?: HttpStatus,
): Promise<R> {
    const testStatus = expectedStatus ?? HttpStatus.Ok;
    console.log(`🔍 Searching for ride with ID: ${rideId}`);

    const getResponse = await request(app)
        .get(`${RIDES_PATH}/${rideId}`)
        .set('Authorization', generateBasicAuthToken())
        .expect(testStatus);

    console.log(`✅ Ride found with status: ${testStatus}`);
    return getResponse.body;
}