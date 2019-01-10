import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './dynamic-forms/components/input/input.component';
import {ButtonComponent} from './dynamic-forms/components/button/button.component';
import {SelectComponent} from './dynamic-forms/components/select/select.component';
import {DateComponent} from './dynamic-forms/components/date/date.component';
import {RadiobuttonComponent} from './dynamic-forms/components/radiobutton/radiobutton.component';
import {CheckboxComponent} from './dynamic-forms/components/checkbox/checkbox.component';
import {DynamicFieldDirective} from './dynamic-forms/directives/dynamic-field/dynamic-field.directive';
import {DynamicFormComponent} from './dynamic-forms/components/dynamic-form/dynamic-form.component';
import {InputTextareaComponent} from './dynamic-forms/components/input-textarea/input-textarea.component';
import {DateRangeComponent} from './dynamic-forms/components/date-range/date-range.component';
import {IconButtonComponent} from './dynamic-forms/components/icon-button/icon-button.component';
import { CurrencyInputComponent } from './dynamic-forms/components/currency-input/currency-input.component';
import { ComboboxComponent } from './dynamic-forms/components/combobox/combobox.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    InputTextareaComponent,
    DateRangeComponent,
    IconButtonComponent,
    CurrencyInputComponent,
    ComboboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    InputTextareaComponent,
    DateRangeComponent,
    IconButtonComponent,
    CurrencyInputComponent,
    ComboboxComponent
  ]
})
export class AppModule {
}
