import {FormGroup} from '@angular/forms';
import {IFieldConfig} from '../interfaces/IFieldConfig';
import {createRequiredValidator, IValidator} from '../interfaces/IValidator';
import {Observable} from 'rxjs';

export class LfmxDynamicFormBuilder {
  constructor() {
  }

  static createFormButton(config: IFormButtonConfig): IFieldConfig {
    return {
      ...mapBaseConfig(config),
      type: 'button',
      inputSpecificConfig: {
        formButtonOptions: {
          buttonType: config.buttonType || 'button',
          callback: config.callback,
          color: config.color || 'primary'
        }
      },
    };
  }

  static createFormCheckbox(config: IFormCheckboxConfig): IFieldConfig {
    return {
      ...mapBaseConfig(config),
      type: 'checkbox',
      name: config.name,
      value: config.defaultValue || false
    };
  }

  static createFormCombobox(config: IFormComboboxConfig): IFieldConfig {
    // TODO
    return {
      type: 'combobox',
      name: config.name,
      label: config.label,
      collections: config.collection$,
      inputSpecificConfig: {
        comboboxConfig: {
          displayField: config.displayField,
          trackField: config.trackField,
          addNewCallback: config.addNewCallback
        }
      }
    };
  }

  static createFormCurrencyInput(config: IFormCurrencyConfig): IFieldConfig {
    const mappedValidators = mapValidators(config);

    if (config.validations) {
      config.validations.push(...mappedValidators);
    } else {
      config.validations = mappedValidators;
    }

    return {
      ...mapBaseConfig(config),
      type: 'currency',
      name: config.name,
      validations: config.validations,
      inputSpecificConfig: {
        currencyInput: {
          allowNegative: config.allowNegative || true
        }
      }
    };
  }

  static createFormDateInput(config: IFormDateConfig): IFieldConfig {
    const mappedValidators = mapValidators(config);

    if (config.validations) {
      config.validations.push(...mappedValidators);
    } else {
      config.validations = mappedValidators;
    }

    return {
      ...mapBaseConfig(config),
      type: 'date',
      name: config.name,
      validations: config.validations,
      value: config.defaultValue
    };
  }

  static createFormDateRangeInput(config: IFormDateRangeConfig): IFieldConfig {
    // add validators for start and end date if the `required` flag is passed in as true
    if (config.startDateRequired) {
      const startValidator = createRequiredValidator(`${config.startDateCtrlLabel} is required`)
      if (config.startDateValidations) {
        config.startDateValidations.push(startValidator);
      } else {
        config.startDateValidations = [startValidator];
      }
    }

    if (config.endDateRequired) {
      const endValidator = createRequiredValidator(`${config.endDateCtrlLabel} is required`)
      if (config.endDateValidations) {
        config.endDateValidations.push(endValidator);
      } else {
        config.endDateValidations = [endValidator];
      }
    }

    return {
      ...mapBaseConfig(config),
      type: 'dateRange',
      name: config.dateRangeCtrlName,
      value: config.selectionBoxDefault || config.selectionBoxOptions[0],
      options: config.selectionBoxOptions,
      inputSpecificConfig: {
        dateRangeOptions: {
          beginDateConfig: {
            type: 'date',
            name: `${config.dateRangeCtrlName}_fromDate`,
            label: config.startDateCtrlLabel || '',
            value: config.defaultStartDateValue,
            validations: config.startDateValidations
          },
          endDateConfig: {
            type: 'date',
            name: `${config.dateRangeCtrlName}_toDate`,
            label: config.endDateCtrlLabel || '',
            value: config.defaultEndDateValue,
            validations: config.endDateValidations
          }
        }
      }
    };
  }

  static createFormIconButton(config: IFormIconButtonConfig): IFieldConfig {
    return {
      ...mapBaseConfig(config),
      type: 'icon',
      inputSpecificConfig: {
        iconButton: {
          callback: config.callback,
          iconName: config.iconName,
          buttonType: config.buttonType || 'button'
        }
      }
    };
  }

  static createFormInput(config: IFormInputConfig): IFieldConfig {
    const mappedValidators = mapValidators(config);
    if (config.validations) {
      config.validations.push(...mappedValidators);
    } else {
      config.validations = mappedValidators;
    }

    return {
      ...mapBaseConfig(config),
      type: 'input',
      name: config.name,
      inputType: config.inputType || 'text',
      validations: config.validations,
    };
  }

  static createFormTextArea(config: IFormTextAreaConfig): IFieldConfig {
    const mappedValidators = mapValidators(config);
    if (config.validations) {
      config.validations.push(...mappedValidators);
    } else {
      config.validations = mappedValidators;
    }

    return {
      ...mapBaseConfig(config),
      type: 'textarea',
      name: config.name,
      validations: config.validations,
      inputType: config.inputType || 'text',
      inputSpecificConfig: {
        textareaDefaultRows: config.defaultRows || 1
      }
    };
  }

  static createFormRadioButton(config: IFormRadioButtonConfig): IFieldConfig {
    return {
      ...mapBaseConfig(config),
      type: 'radiobutton',
      name: config.name,
      options: config.options,
      value: config.defaultValue || config.options[0],
    };
  }

  static createFormSelect(config: IFormSelectConfig): IFieldConfig {
    return {
      ...mapBaseConfig(config),
      type: 'select',
      name: config.name,
      options: config.options,
      value: config.defaultValue || config.options[0],
    };
  }
}

// define input builder configuration interfaces
class BaseFormComponentConfig {
  label?: string;
  hidden?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
  styles?: any;
  cssClasses?: string[];
  required?: boolean;
}

export interface IFormButtonConfig extends BaseFormComponentConfig {
  buttonType?: 'submit' | 'button';
  callback?: (form: FormGroup) => void;
  color?: 'primary' | 'secondary' | 'accent' | 'warn';
}

export interface IFormCheckboxConfig extends BaseFormComponentConfig {
  name: string;
  defaultValue?: boolean;
}

export interface IFormComboboxConfig extends BaseFormComponentConfig {
  // TODO
  name: string;
  label?: string;
  collection$: Observable<any[]>;
  addNewCallback: (() => void);
  displayField: string;
  trackField: string;
}

export interface IFormCurrencyConfig extends BaseFormComponentConfig {
  name: string;
  validations?: IValidator[];
  allowNegative?: boolean;
}

export interface IFormDateConfig extends BaseFormComponentConfig {
  name: string;
  validations?: IValidator[];
  defaultValue?: Date;
}

export interface IFormDateRangeConfig extends BaseFormComponentConfig {
  dateRangeCtrlName: string;
  selectionBoxOptions: string[];
  selectionBoxDefault?: string;

  startDateCtrlLabel?: string;
  startDateValidations?: IValidator[];
  startDateRequired?: boolean;
  defaultStartDateValue?: Date;

  endDateCtrlLabel?: string;
  endDateValidations?: IValidator[];
  endDateRequired?: boolean;
  defaultEndDateValue?: Date;
}

export interface IFormIconButtonConfig extends BaseFormComponentConfig {
  iconName: string;
  buttonType?: 'button' | 'submit';
  callback: (form: FormGroup) => void;
}

export interface IFormInputConfig extends BaseFormComponentConfig {
  name: string;
  inputType?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
  validations?: IValidator[];
}

export interface IFormTextAreaConfig extends BaseFormComponentConfig {
  name: string;
  label?: string;
  inputType?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
  defaultRows?: number;
  validations?: IValidator[];
}

export interface IFormRadioButtonConfig extends BaseFormComponentConfig {
  name: string;
  label?: string;
  options: string[];
  defaultValue?: string;
}

export interface IFormSelectConfig extends BaseFormComponentConfig {
  name: string;
  label?: string;
  options: string[];
  defaultValue?: string;
}

function mapBaseConfig(config: BaseFormComponentConfig) {
  return {
    label: config.label,
    hide: config.hidden || false,
    disabled: config.disabled || false,
    styles: config.styles,
    cssClasses: config.cssClasses,
    required: config.required || false
  };
}

function mapValidators(config: BaseFormComponentConfig): IValidator[] {
  const validations: IValidator[] = [];

  // check if the `required` flag was set, and generate validator if it was.
  if (config.required) {
    validations.push(createRequiredValidator(`${config.label} is required`));
  }

  // add more generated validators here if in the future more validation scenario arises, i.e. email format etc.

  return validations;
}
