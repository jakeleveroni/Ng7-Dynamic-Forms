import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';


@Component({
  selector: 'app-dynamic-date',
  template: `
    <mat-form-field class="dynamic-date-input"
                    [formGroup]="group"
                    [ngStyle]="getComponentStyles()"
                    [ngClass]="getComponentClasses()">
      <input matInput
             [matDatepicker]="picker"
             [formControlName]="field.name"
             [placeholder]="field.label">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-hint></mat-hint>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: [
    `
      app-dynamic-date {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DateComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
