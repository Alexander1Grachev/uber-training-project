import { createDriversHandler } from '../../drivers/controllers/create-driver.handler';
import { deleteDriversHandler } from '../../drivers/controllers/delete-driver.handler';
import { getDriversListHandler } from '../../drivers/controllers/get-driver-list.handler';
import { getDriversHandler } from '../../drivers/controllers/get-driver.handler';
import { updateDriversHandler } from '../../drivers/controllers/update-driver.handler';

export const driversController = {
  create: createDriversHandler,
  getList: getDriversListHandler,
  getOne: getDriversHandler,
  update: updateDriversHandler,
  delete: deleteDriversHandler,
};
