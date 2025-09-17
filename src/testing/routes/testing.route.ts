import { Router, Request, Response } from 'express';
import { HttpStatus } from '../../core/const/http-statuses';
import { driverCollection, rideCollection } from '../../db/mongo.db';

export const testingRouter = Router({});

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  console.log('🔄 Testing endpoint called: /all-data');
  console.log('📊 Collections status:', {
    rideCollection: rideCollection ? `exists (${rideCollection.collectionName})` : 'NULL',
    driverCollection: driverCollection ? `exists (${driverCollection.collectionName})` : 'NULL'
  });

  if (!rideCollection || !driverCollection) {
    console.error('❌ Collections not initialized - cannot clear database');
    res.status(HttpStatus.InternalServerError).send('❌ Collections not initialized');
    return;
  }

  try {
    console.log('🗑️ Starting database cleanup...');
    const result = await Promise.all([
      rideCollection.deleteMany({}),
      driverCollection.deleteMany({}),
    ]);

    console.log('✅ Database cleared successfully:', {
      ridesDeleted: result[0].deletedCount,
      driversDeleted: result[1].deletedCount
    });

    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    res.status(HttpStatus.InternalServerError).send('Internal Server Error');
  }
});