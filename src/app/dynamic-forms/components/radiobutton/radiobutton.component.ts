import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';

@Component({
  selector: 'app-dynamic-radiobutton',
  template: `
    <div class="dynamic-radio-group"
         [formGroup]="group"
         [ngStyle]="getComponentStyles()"
         [ngClass]="getComponentClasses()">
      <label>{{field.label}}:</label>
      <mat-radio-group [formControlName]="field.name">
        <mat-radio-button *ngFor="let item of field.options" [value]="item">{{item}}</mat-radio-button>
      </mat-radio-group>
    </div>
  `,
  styles: [
      `
      app-dynamic-radiobutton {
        width: 95%;
      }

      .dynamic-radio-group {
        margin-right: 0;
        display: inline-block;
      }

      .dynamic-radio-group label, mat-radio-button {
        padding-right: 10px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class RadiobuttonComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
