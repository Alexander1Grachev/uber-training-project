import { Collection, Db, MongoClient } from 'mongodb';
import { Driver } from '../drivers/types/driver';
import { Ride } from '../rides/types/ride';
import { SETTINGS } from '../core/settings/settings';

const DRIVER_COLLECTION_NAME = 'drivers';
const RIDE_COLLECTION_NAME = 'rides';

export let client: MongoClient;
export let driverCollection: Collection<Driver>;
export let rideCollection: Collection<Ride>;

// Подключения к бд
export async function runDB(url: string): Promise<void> {
  console.log('🔗 Connecting to database:', url);
  client = new MongoClient(url);


  try {
    await client.connect(); // ПОДКЛЮЧЕНИЕ ПЕРВЫМ!
    console.log('✅ MongoDB client connected');

    const db: Db = client.db(SETTINGS.DB_NAME);
    console.log('✅ Database instance created:', SETTINGS.DB_NAME);

    // Инициализация коллекций
    driverCollection = db.collection<Driver>(DRIVER_COLLECTION_NAME);
    rideCollection = db.collection<Ride>(RIDE_COLLECTION_NAME);

    console.log('✅ Collections initialized:', {
      drivers: !!driverCollection,
      rides: !!rideCollection
    });

    await db.command({ ping: 1 });
    console.log('✅ Database ping successful');
    console.log('✅ Connected to the database');
  } catch (e) {
    console.error('❌ Database connection error:', e);
    await client.close();
    throw new Error(`❌ Database not connected: ${e}`);
  }
}

// для тестов
export async function stopDb() {
  if (!client) {
    console.error('❌ No active client to stop');
    throw new Error(`❌ No active client`);
  }
  await client.close();
  console.log('✅ Database connection closed');
}