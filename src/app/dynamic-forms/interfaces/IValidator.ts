import {Validators} from '@angular/forms';

export interface IValidator {
    name: string;
    validator: any;
    message: string;
}

// common validators
export function createRequiredValidator(errMsg: string): IValidator {
  return {
    name: 'required',
    validator: Validators.required,
    message: errMsg
  };
}
