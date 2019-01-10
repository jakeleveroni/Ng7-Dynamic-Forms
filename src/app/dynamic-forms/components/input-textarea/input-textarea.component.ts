import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-dynamic-input-textarea',
  template: `
    <mat-form-field class="dynamic-input-textarea"
                    [formGroup]="group"
                    [ngStyle]="getComponentStyles()"
                    [ngClass]="getComponentClasses()">
      <mat-label>{{field.label}}</mat-label>
      <textarea matInput
                cdkTextareaAutosize
                #autosize="cdkTextareaAutosize"
                [formControlName]="field.name"
                [type]="field.inputType"
                [rows]="getDefaultRows()">
      </textarea>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>`,
  styles: [
      `
      app-dynamic-input-textarea {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputTextareaComponent extends BaseInput implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public getDefaultRows() {
    return this.field.inputSpecificConfig
      ? this.field.inputSpecificConfig.textareaDefaultRows
        ? this.field.inputSpecificConfig.textareaDefaultRows
        : 3
      : 3;
  }
}
