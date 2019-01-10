import {InputComponent} from './components/input/input.component';
import {ButtonComponent} from './components/button/button.component';
import {SelectComponent} from './components/select/select.component';
import {DateComponent} from './components/date/date.component';
import {RadiobuttonComponent} from './components/radiobutton/radiobutton.component';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {InputTextareaComponent} from './components/input-textarea/input-textarea.component';
import {DateRangeComponent} from './components/date-range/date-range.component';
import {IconButtonComponent} from './components/icon-button/icon-button.component';
import {CurrencyInputComponent} from './components/currency-input/currency-input.component';
import {ComboboxComponent} from './components/combobox/combobox.component';

// Map types to their components for the component factory resolver
export const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  dateRange: DateRangeComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  textarea: InputTextareaComponent,
  icon: IconButtonComponent,
  currency: CurrencyInputComponent,
  combobox: ComboboxComponent
};

export type DynamicFormInput =
  'input' | 'button' | 'select' | 'date' |
  'dateRange' | 'radiobutton' | 'checkbox' |
  'textarea' | 'icon' | 'currency' | 'combobox';
