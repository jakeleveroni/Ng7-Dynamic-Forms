import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseInput} from '../../interfaces/BaseInput';
import {combineLatest, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-combobox',
  template: `
    <mat-form-field [formGroup]="group"
                    [ngStyle]="getComponentStyles()"
                    [ngClass]="getComponentStyles()">
      <input type="text"
             #comboboxInput
             [placeholder]="field.label"
             matInput
             [formControlName]="field.name"
             [matAutocomplete]="auto">
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
        <mat-option *ngFor="let option of (filteredCollection$ | async)"
                    [value]="option[comboboxConfig.trackField]">
          {{option[comboboxConfig.displayField]}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: [`
    app-dynamic-combobox {
      width: 95%;
    }`
  ],
  encapsulation: ViewEncapsulation.None
})
export class ComboboxComponent extends BaseInput implements OnInit {
  filteredCollection$: Observable<any[]>;
  collection$: Observable<any[]>;

  constructor() {
    super();
  }

  // TODO super weird array conversion here not sure why `collection` is not already an array
  ngOnInit() {
    this.collection$ = this.field.collections;
    this.filteredCollection$ =
      combineLatest(this.group.controls[this.field.name].valueChanges, this.collection$).pipe(
        tap(([changes, collection]) => console.log(changes, collection)),
        switchMap(([changes, collection]) => {
          if (changes !== '' && changes.toLowerCase) {
            return [collection.filter((item) =>
              item[this.comboboxConfig.displayField]
                .toLowerCase().indexOf(changes.toLowerCase()) === 0
            )];
          }
          return [collection];
        }),
      );
  }

  get comboboxConfig() {
    return this.field.inputSpecificConfig.comboboxConfig;
  }
}
