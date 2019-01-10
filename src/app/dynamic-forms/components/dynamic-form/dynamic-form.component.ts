import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidatorFn} from '@angular/forms';
import {IFormConfig} from '../../interfaces/IFormConfig';
import {IFormOption} from '../../interfaces/IFormOption';
import * as _ from 'lodash';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <mat-card class="dynamic-form-card-container" [ngClass]="getFormClasses()">
      <mat-card-title *ngIf="config.title">{{config.title | titlecase}}</mat-card-title>
      <mat-card-content>
        <form class="dynamic-form" [formGroup]="form">
          <mat-grid-list *ngFor="let fieldRow of config.fields" class="form-grid"
                         [cols]="fieldRow.length" rowHeight="fit">
            <mat-grid-tile *ngFor="let field of fieldRow" [colspan]="1" [rowspan]="1">
              <ng-container class="dynamic-input"
                            appDynamicField
                            [field]="field"
                            [group]="form">
              </ng-container>
            </mat-grid-tile>
          </mat-grid-list>
        </form>
      </mat-card-content>
      <mat-card-actions *ngIf="hasButtonBar">
        <div class="form-action-btns">
          <button *ngFor="let option of config.buttons"
                  (click)="option.cb(form)" mat-raised-button
                  [color]="getColor(option)"
                  [disabled]="option.disabled">
            {{option.label}}
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
      `
      /* form-grid needs to have  size set for mat-grid-list to auto size row heights */
      .form-grid {
        min-height: 100px;
      }

      .dynamic-form-card-container {
        height: 100%;
        width: 75%;
        margin: 15px auto 15px auto;
      }

      .flat-card {
        box-shadow: none;
        border: none;
      }

      .form-action-btns button {
        margin: 10px 8px auto auto;
      }
    `
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() config: IFormConfig;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.sanitizeFormConfiguration();
    this.form = this.createControl();
  }

  get value() {
    // we can map the date-range objects in the form value here to be their own sub-object
    // transforms form.value from {dateRangeName: string, beginDateName: any, endDateName: any} to
    // dateRangeName: {label: string, beginDate: any, endDate: any}
    // this method supports multiple date range inputs in a form but the top level IFieldConfig name must be unique!
    const excludedDateKeys = [];
    const aggregatedDateInfo = {};
    this.config.fields.forEach((fieldRow) => {
      const dateRangeIndex = fieldRow.findIndex(o => o.type === 'dateRange');

      if (dateRangeIndex !== -1) {
        aggregatedDateInfo[fieldRow[dateRangeIndex].name] = {
          label: this.form.value[fieldRow[dateRangeIndex].name],
          beginDate: this.form.value[fieldRow[dateRangeIndex].inputSpecificConfig.dateRangeOptions.beginDateConfig.name],
          endDate: this.form.value[fieldRow[dateRangeIndex].inputSpecificConfig.dateRangeOptions.endDateConfig.name]
        };

        excludedDateKeys.push(fieldRow[dateRangeIndex].name,
          fieldRow[dateRangeIndex].inputSpecificConfig.dateRangeOptions.beginDateConfig.name,
          fieldRow[dateRangeIndex].inputSpecificConfig.dateRangeOptions.endDateConfig.name);
      }
    });


    return {
      ..._.omit(this.form.value, excludedDateKeys),
      ...aggregatedDateInfo
    };
  }

  get hasButtonBar() {
    return !this.config.disableButtonBar || this.config.buttons.length < 1;
  }

  public getColor(option: IFormOption): string {
    return option.color ? option.color : 'primary';
  }

  private sanitizeFormConfiguration() {
    // because of the size of a date range component, for now we will only allow it
    // to be the entire width of the parent div. If the configuration passed in
    // is configured for a date range input to share a row with another input
    // we will force it to be on its own row and take up the entirety of the parent width
    this.config.fields.forEach((fieldRow, i) => {
      const dateRangeFieldIndex = fieldRow.findIndex(o => o.type === 'dateRange');

      if (dateRangeFieldIndex !== -1) {
        if (fieldRow.length > 1) {
          console.log(`Because date range is a bigger component, it is only allowed to share a row
          with at most 1 other input, its been moved to its own row for now.`);
          const splicedDateRange = this.config.fields[i].splice(dateRangeFieldIndex, 1);
          this.config.fields.splice(dateRangeFieldIndex - 1, 0, splicedDateRange);
        }
      }
    });
  }

  public createControl(): FormGroup {
    const group = this.fb.group({});
    this.config.fields.forEach(row => {
      row.forEach(field => {
        if (field.type === 'button') {
          return;
        }

        const control = this.fb.control({
          value: field.value,
          disabled: field.disabled instanceof Function ? field.disabled() : field.disabled || false
        }, this.bindValidations(field.validations || []));

        // add the extra form controls for the beginning and ending dates of the date range component
        if (field.type === 'dateRange') {
          const beginConfig = field.inputSpecificConfig.dateRangeOptions.beginDateConfig;
          const endConfig = field.inputSpecificConfig.dateRangeOptions.endDateConfig;

          const beginDateControl = this.fb.control({
            value: beginConfig.value,
            disabled: beginConfig.disabled instanceof Function ? beginConfig.disabled() : beginConfig.disabled || false
          }, this.bindValidations(beginConfig.validations || []));
          const endDateControl = this.fb.control({
            value: endConfig.value,
            disabled: endConfig.disabled instanceof Function ? endConfig.disabled() : endConfig.disabled || false
          }, this.bindValidations(endConfig.validations || []));

          group.addControl(beginConfig.name, beginDateControl);
          group.addControl(endConfig.name, endDateControl);
        }

        group.addControl(field.name, control);
      });
    });

    return group;
  }

  public bindValidations(validations: any): ValidatorFn {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });

      return Validators.compose(validList);
    }
    return null;
  }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control.markAsTouched({onlySelf: true});
    });
  }

  public getFormClasses() {
    const classes = [];
    if (this.config.removeCardBorder) {
      classes.push('flat-card');
    }
    return classes.join(' ');
  }
}
