import {Component, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {DynamicFormComponent} from './dynamic-forms/components/dynamic-form/dynamic-form.component';
import {IFormConfig} from './dynamic-forms/interfaces/IFormConfig';
import {Observable, of} from 'rxjs';
import {LfmxDynamicFormBuilder} from './dynamic-forms/services/lfmx-dynamic-form-builder.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  public example$: Observable<any[]> = of([
    {name: 'one', value: 1},
    {name: 'two', value: 2},
    {name: 'three', value: 3}
  ]);

  public formConfig: IFormConfig = {
    title: 'Testing Dynamic Forms',
    disableButtonBar: false,
    removeCardBorder: false,
    buttons: [{
        label: 'Button Bar 1',
        cb: (form: FormGroup) => console.log('pressed option 1', form.value),
        disabled: false
      }, {
        label: 'Button Bar 2',
        cb: (form: FormGroup) => console.log('pressed option 2'),
        disabled: false,
        color: 'accent'
      }, {
        label: 'Button Bar 3',
        cb: (form: FormGroup) => console.log('pressed option 3'),
        disabled: false,
        color: 'warn'
      }, {
        label: 'Button Bar 4',
        cb: (form: FormGroup) => console.log('pressed option 3'),
        disabled: true,
        color: 'warn'
      }
    ],
    fields: [
      [
        LfmxDynamicFormBuilder.createFormInput({
          name: 'input-one',
          label: 'Username',
          inputType: 'text',
          hidden: false,
          required: true,
          validations: [{
            name: 'pattern',
            validator: Validators.pattern('^[a-zA-Z]+$'),
            message: 'Accept only text'
          }]
        }),
        LfmxDynamicFormBuilder.createFormCurrencyInput({
          label: 'Currency Amount',
          name: 'currency-one',
          required: true,
          allowNegative: false
        }),
        LfmxDynamicFormBuilder.createFormCombobox({
          label: 'Combobox Dynamic Data',
          name: 'combobox-one',
          collection$: this.example$.pipe(delay(1500)),
          displayField: 'name',
          trackField: 'value',
          addNewCallback: (() => console.log('added new'))
        })
      ],
      [
        LfmxDynamicFormBuilder.createFormRadioButton({
          label: 'Gender',
          name: 'radio-one',
          options: ['Male', 'Female', 'Prefer Not To Say'],
          defaultValue: 'Male'
        }),
        LfmxDynamicFormBuilder.createFormIconButton({
          label: 'Optional Icon Label',
          iconName: 'favorite',
          callback: ((form: FormGroup) => console.log('clicked icon', form))
        }),
        LfmxDynamicFormBuilder.createFormDateInput({
          label: 'Single Date Input',
          name: 'single-date-one',
          defaultValue: new Date(),
          required: true
        })
      ],
      [
        LfmxDynamicFormBuilder.createFormSelect({
          label: 'Country',
          name: 'select-one',
          options: ['India', 'UAE', 'UK', 'US']
        }),
        LfmxDynamicFormBuilder.createFormCheckbox({
          label: 'Accept Terms',
          name: 'checkbox-one',
          defaultValue: false
        }),
        LfmxDynamicFormBuilder.createFormTextArea({
          required: true,
          label: 'Test Textarea',
          name: 'text-area-one',
          defaultRows: 3
        }),
        LfmxDynamicFormBuilder.createFormButton({
          color: 'accent',
          callback: (form: FormGroup) => console.log('clicked in form btn', form),
          label: 'In Form Button'
        })
      ],
      [
        LfmxDynamicFormBuilder.createFormDateRangeInput({
          label: 'Date Range Label',
          dateRangeCtrlName: 'date-range-one',
          selectionBoxOptions: ['Yearly', 'Quarterly', 'Semi-Annually'],
          startDateCtrlLabel: 'Begin Date',
          defaultStartDateValue: new Date(),
          startDateRequired: true,
          endDateCtrlLabel: 'End Date',
          endDateRequired: true
        }),
        LfmxDynamicFormBuilder.createFormInput({
          label: 'Automatically moved to next line after date-range component',
          inputType: 'text',
          name: 'input-two',
          disabled: true
        })
      ]
    ]
  };

  submit(value: any) {
    console.log('submitted', value);
  }

  debug() {
    console.log(this.form.value, this.formConfig.fields.length);
  }
}
