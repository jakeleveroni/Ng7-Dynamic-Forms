import {FormGroup} from '@angular/forms';

export interface IFormOption {
  label: string;
  cb: ((form: FormGroup) => void);
  disabled?: boolean | (() => boolean);
  color?: 'primary' | 'warn' | 'accent';
}
