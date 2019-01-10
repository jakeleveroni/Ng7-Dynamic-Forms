import {IFieldConfig} from './IFieldConfig';
import {IFormOption} from './IFormOption';

export interface IFormConfig {
  title?: string;
  disableButtonBar?: boolean;
  removeCardBorder?: boolean;
  fields: Array<IFieldConfig[]>;
  buttons?: IFormOption[];
}
