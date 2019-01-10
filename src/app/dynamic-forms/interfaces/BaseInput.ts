import {IFieldConfig} from './IFieldConfig';
import {FormGroup} from '@angular/forms';

export class BaseInput {
  field: IFieldConfig;
  group: FormGroup;
  width: string;

  protected componentIsHidden() {
    return this.field.hide instanceof Function ? this.field.hide() : this.field.hide || false;
  }

  protected getComponentStyles() {
    return {
      width: '100%',
      display: this.componentIsHidden() ? 'none' : 'auto',
      ...this.field.styles
    };
  }

  protected getComponentClasses() {
    return this.field.cssClasses;
  }
}
