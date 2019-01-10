import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';


@Component({
  selector: 'app-dynamic-select',
  template: `
    <mat-form-field class="dynamic-select"
                    [formGroup]="group"
                    [ngStyle]="getComponentStyles()"
                    [ngClass]="getComponentClasses()">
      <mat-select [placeholder]="field.label"
                  [formControlName]="field.name">
        <mat-option *ngFor="let item of field.options" [value]="item">
          {{item}}
        </mat-option>
      </mat-select>
    </mat-form-field>`,
  styles: [
    `
      app-dynamic-select {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
