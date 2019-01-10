import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {componentMapper} from '../../constants';

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: IFieldConfig;
  @Input() group: FormGroup;
  @Input() width: string;
  public componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {

  }

  public ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);

    if (!factory) {
      throw new Error(`Invalid component type specified for dynamic form ${this.field.type}`);
    }

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.width = this.width;
    this.componentRef.instance.group = this.group;
  }
}

