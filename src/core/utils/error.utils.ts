import { ValidationError } from '../../../src/core/types/validationError';

export const createErrorMessages = (
  errors: ValidationError[],
): { errorMessages: ValidationError[] } => {
  return { errorMessages: errors };
};
