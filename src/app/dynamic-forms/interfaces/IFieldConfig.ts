import {IValidator} from './IValidator';
import {FormGroup} from '@angular/forms';
import {DynamicFormInput} from '../constants';
import {Observable} from 'rxjs';

export interface IFieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: Observable<any[]>;
  type: DynamicFormInput;
  value?: any;
  validations?: IValidator[];
  required?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
  hide?: boolean | (() => boolean);
  cssClasses?: string[];
  styles?: any;
  inputSpecificConfig?: {
    textareaDefaultRows?: number;
    comboboxConfig?: {
      addNewCallback?: (() => void);
      displayField: string;
      trackField: string;
    },
    formButtonOptions?: {
      buttonType?: string;
      callback?: (form: FormGroup) => void;
      color?: string
    };
    dateRangeOptions?: {
      beginDateConfig?: IFieldConfig;
      endDateConfig?: IFieldConfig;
    },
    iconButton?: {
      iconName: string,
      buttonType?: 'button' | 'submit';
      callback: ((form: FormGroup) => void)
    };
    currencyInput?: {
      allowNegative?: boolean;
    };
  };
}
