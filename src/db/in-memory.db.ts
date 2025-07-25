// имитация базы данных (хранит данные в памяти приложения)
//Содержит объект db с коллекцией videos
// (аналогично было для drivers в примере)
import { Driver, VehicleFeature } from '../drivers/types/driver';

export const db = {
  drivers: <Driver[]>[
    {
      id: 1,
      name: 'Tom Rider',
      phoneNumber: '123-456-7890',
      email: 'tom.rider@example.com',
      vehicleMake: 'BMW',
      vehicleModel: 'Cabrio',
      vehicleYear: 2020,
      vehicleLicensePlate: 'ABC-32145',
      vehicleDescription: null,
      vehicleFeatures: [],
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Tom Rider',
      phoneNumber: '123-456-7890',
      email: 'tom.rider@example.com',
      vehicleMake: 'Ford',
      vehicleModel: 'Mustang Shelby GT',
      vehicleYear: 2019,
      vehicleLicensePlate: 'XYZ-21342',
      vehicleDescription: null,
      vehicleFeatures: [VehicleFeature.WiFi, VehicleFeature.ChildSeat],
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Tom Rider',
      phoneNumber: '123-456-7890',
      email: 'tom.rider@example.com',
      vehicleMake: 'BMW',
      vehicleModel: '18',
      vehicleYear: 2021,
      vehicleLicensePlate: 'LMN-31234',
      vehicleDescription: null,
      vehicleFeatures: [],
      createdAt: new Date(),
    },
  ],
};
