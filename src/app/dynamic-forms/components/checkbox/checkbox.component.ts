import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';

@Component({
  selector: 'app-dynamic-checkbox',
  template: `
    <div class="dynamic-checkbox"
         [formGroup]="group"
         [ngStyle]="getComponentStyles()"
         [ngClass]="getComponentClasses()">
      <mat-checkbox [formControlName]="field.name">
        {{field.label}}
      </mat-checkbox>
    </div>
  `,
  styles: [
      `
      .dynamic-checkbox {
        display: inline-block;
      }

      app-dynamic-checkbox {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
