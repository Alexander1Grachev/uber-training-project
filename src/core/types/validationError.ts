import { HttpStatus } from '../const/http-statuses';
export type ValidationErrorType = {
  status: HttpStatus;
  detail: string;
  source?: string;
  code?: string;
};
