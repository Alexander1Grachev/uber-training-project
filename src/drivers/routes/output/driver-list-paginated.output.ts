import { PaginatedOutput } from '../../../core/types/paginated.output';
import { DriverDataOutput } from './driver-data.output';

export type DriverListPaginatedOutput = {
  meta: PaginatedOutput;
  data: DriverDataOutput[];
};
