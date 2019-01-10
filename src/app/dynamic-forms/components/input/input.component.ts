import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';

@Component({
  selector: 'app-dynamic-input',
  template: `
    <mat-form-field
      [formGroup]="group"
      [ngStyle]="getComponentStyles()"
      [ngClass]="getComponentClasses()">
      <input matInput
             [formControlName]="field.name"
             [placeholder]="field.label"
             [type]="field.inputType">
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>`,
  styles: [
    `
      app-dynamic-input {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
