import validator from 'validator';

import { PhoneValidator } from '@/presentation/validation/protocols';

export class ValidatorPhoneAdapter implements PhoneValidator {
  validate(phone: PhoneValidator.Params): PhoneValidator.Result {
    if (!phone) return true;
    const phoneIsValid = validator.isMobilePhone(phone, 'pt-BR', {
      strictMode: true,
    });
    return phoneIsValid;
  }
}
