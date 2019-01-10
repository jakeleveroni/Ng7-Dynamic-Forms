import {Component, ElementRef, forwardRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BaseInput} from '../../interfaces/BaseInput';

@Component({
  selector: 'app-dynamic-currency-input',
  template: `
    <mat-form-field class="dynamic-currency-input"
                    [formGroup]="group"
                    [ngStyle]="getComponentStyles()"
                    [ngClass]="getComponentClasses()">
      <input #input
             autocomplete="off"
             matInput
             [formControlName]="field.name"
             (keyup)="keyUp($event)"
             placeholder="{{field.label}}">
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: [
    `
      app-dynamic-currency-input {
        width: 95%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: (forwardRef(() => CurrencyInputComponent)),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: (forwardRef(() => CurrencyInputComponent)),
      multi: true
    },
  ]
})
export class CurrencyInputComponent extends BaseInput implements OnInit {
  @ViewChild('input') el: ElementRef;
  public allowNegative: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.field.inputSpecificConfig.currencyInput) {
      this.field.inputSpecificConfig.currencyInput.allowNegative
        = this.field.inputSpecificConfig.currencyInput.allowNegative == null
        ? true
        : this.field.inputSpecificConfig.currencyInput.allowNegative;
    } else {
      this.field.inputSpecificConfig.currencyInput.allowNegative = true;
    }

  }

  public keyUp($event: any) {
    const currCaretPos = getCaretPosition(this.el.nativeElement);
    let prevValue = $event.target.value;

    if ($event.key === 'Delete' && currCaretPos === 0 && prevValue) {
      prevValue = prevValue.substring(1);
    }

    const numValue = parseValue(prevValue);
    $event.target.value = formatAmount(numValue);
    setCaretPosition(this.el.nativeElement, calculateNewCaretPos(prevValue, $event.target.value, currCaretPos));
  }
}

function parseValue(value: string): string {
  const valueArr = value.split('.');
  value = valueArr[0];
  if (valueArr[1]) {
    value += '.' + valueArr[1].substring(0, 2);
  }
  const num = parseFloat(value.replace(/,/g, '').replace('$', ''));
  return !isNaN(num) ? num.toFixed(2) : '';
}

const formatAmount = (value: string): string =>
  !value || value === '' ?
    '' :
    '$' + value.replace(/./g, formatAsCurrency);

function calculateNewCaretPos(prevValue: string, currValue: string, currPos: number): number {
  return currPos + getNotDecimalsCount(currValue) - getNotDecimalsCount(prevValue);

  function getNotDecimalsCount(str: string): number {
    let count = 0;
    for (let i = 0; i < currPos; i++) {
      if (!/^\d+$/.test(str[i])) {
        count++;
      }
    }
    return count;
  }
}

function formatAsCurrency(c, i, a) {
  return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
}

function getCaretPosition(ctrl) {
  return ctrl.selectionStart;
}


function setCaretPosition(ctrl, pos) {
  ctrl.setSelectionRange(pos, pos);
}
