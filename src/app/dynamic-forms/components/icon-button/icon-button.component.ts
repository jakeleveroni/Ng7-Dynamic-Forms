import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';

@Component({
  selector: 'app-dynamic-icon-button',
  template: `
    <div class="dynamic-icon-button"
         [formGroup]="group"
         [ngStyle]="getComponentStyles()"
         [ngClass]="getComponentClasses()">
      <button mat-icon-button
              (click)="iconButtonConfig.callback(group)"
              [type]="iconButtonConfig.buttonType">
        <mat-icon>{{iconButtonConfig.iconName}}</mat-icon>
      </button>
      <span *ngIf="field.label">{{field.label}}</span>

    </div>`,
  styles: [
    `
      app-dynamic-icon-button {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class IconButtonComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }

  get iconButtonConfig() {
    return this.field.inputSpecificConfig.iconButton;
  }
}
