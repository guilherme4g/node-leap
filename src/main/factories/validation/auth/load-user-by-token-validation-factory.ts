import { Validation } from '@/presentation/validation/protocols';

import {
  JWTValidation,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/presentation/validation/validators';

import { ValidatorJWTAdapter } from '@/infra/validators';

const validations: Validation[] = [];

for (const field of ['token']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new JWTValidation('token', new ValidatorJWTAdapter()));

export const makeLoadUserByTokenValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
