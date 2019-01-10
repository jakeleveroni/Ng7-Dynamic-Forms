import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';


@Component({
  selector: 'app-dynamic-date-range',
  template:
      `
    <!-- Selection Box -->
    <div [formGroup]="group" [ngStyle]="getComponentStyles()">
      <mat-form-field class="dynamic-select">
        <mat-select [placeholder]="field.label"
                    [formControlName]="field.name">
          <mat-option *ngFor="let item of field.options" [value]="item">
            {{item}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <!-- Being Date -->
      <mat-form-field class="dynamic-date-range-picker">
        <input matInput
               [matDatepicker]="beginPicker"
               [formControlName]="beginDateConfig.name"
               [placeholder]="beginDateConfig.label">
        <mat-datepicker-toggle matSuffix [for]="beginPicker"></mat-datepicker-toggle>
        <mat-datepicker #beginPicker></mat-datepicker>
        <mat-hint></mat-hint>
        <ng-container *ngFor="let validation of beginDateConfig.validations;" ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(beginDateConfig.name).hasError(validation.name)">{{validation.message}}</mat-error>
        </ng-container>
      </mat-form-field>

      <!-- End Date -->
      <mat-form-field class="dynamic-date-range-picker">
        <input matInput
               [matDatepicker]="endPicker"
               [formControlName]="endDateConfig.name"
               [placeholder]="endDateConfig.label">
        <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
        <mat-hint></mat-hint>
        <ng-container *ngFor="let validation of endDateConfig.validations;" ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(endDateConfig.name).hasError(validation.name)">{{validation.message}}</mat-error>
        </ng-container>
      </mat-form-field>
    </div>
  `,
  styles: [
      `
      .dynamic-select {
        padding-right: 1%;
        width: 30%;
        margin-top: 15px;
      }

      .dynamic-date-range-picker {
        width: 33%;
        margin-right: 10px;
      }

      app-dynamic-date-range {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DateRangeComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  public get beginDateConfig() {
    return this.field.inputSpecificConfig.dateRangeOptions.beginDateConfig;
  }

  public get endDateConfig() {
    return this.field.inputSpecificConfig.dateRangeOptions.endDateConfig;
  }

  ngOnInit() {
    // sanity check to make sure that date range object is configured correctly
    if (!this.field.inputSpecificConfig.dateRangeOptions
      || !this.field.inputSpecificConfig.dateRangeOptions.beginDateConfig
      || !this.field.inputSpecificConfig.dateRangeOptions.endDateConfig) {
      throw new Error('Invalid configuration for date range picker, must specify a IFieldConfig for both being and end date');
    }
  }
}
