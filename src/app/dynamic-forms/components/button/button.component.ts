import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-button',
  template: `
    <div class="dynamic-button"
         [formGroup]="group"
         [ngClass]="getComponentClasses()">
      <button [type]="inputConfig.buttonType"
              mat-raised-button
              [color]="inputConfig.color"
              (click)="buttonCallback(group)">
        {{field.label}}
      </button>
    </div>`,
  styles: [
      `
      app-dynamic-button {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

  get buttonCallback(): ((form: FormGroup) => void) {
    if (!this.field.inputSpecificConfig) {
      return ((form: FormGroup) => {
      });
    }

    return this.field.inputSpecificConfig.formButtonOptions.callback || ((form: FormGroup) => {
      console.log(form);
    });
  }

  get inputConfig() {
    return this.field.inputSpecificConfig.formButtonOptions;
  }
}
