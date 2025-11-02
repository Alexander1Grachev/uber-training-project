import { Router, Request, Response } from 'express';
import { HttpStatus } from '../../core/const/http-statuses';
import { driverCollection, rideCollection } from '../../db/mongo.db';

export const testingRouter = Router({});

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  console.log('🧹 Testing endpoint: clearing all data...');

  // логи перед очисткой
  const driversBefore = await driverCollection.countDocuments();
  const ridesBefore = await rideCollection.countDocuments();
  console.log(
    `📊 Before cleanup - Drivers: ${driversBefore}, Rides: ${ridesBefore}`,
  );

  // Очистка (нужно передать пустой объект)
  await Promise.all([
    rideCollection.deleteMany({}),
    driverCollection.deleteMany({}),
  ]);

  // логи после очистки
  const driversAfter = await driverCollection.countDocuments();
  const ridesAfter = await rideCollection.countDocuments();
  console.log(
    `📊 After cleanup - Drivers: ${driversAfter}, Rides: ${ridesAfter}`,
  );

  if (driversAfter > 0 || ridesAfter > 0) {
    console.error('❌ Database was not cleared properly!');
  }

  console.log('✅ Database cleared via testing endpoint');
  res.sendStatus(HttpStatus.NoContent);
});
