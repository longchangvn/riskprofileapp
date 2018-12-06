import {
  Component, OnChanges, AfterViewInit,
  OnDestroy, Input, Type, Output,
  ComponentRef, ComponentFactoryResolver, ViewContainerRef, EventEmitter
} from '@angular/core';

@Component({
  selector: 'dynamic-component',
  template: `<ng-container></ng-container>`
})
export class RenderDynamicComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() componentType: Type<any>;
  @Input() componentRef: ComponentRef<any>;
  @Output() componentUpdated: EventEmitter<ComponentRef<any>> = new EventEmitter();
  private isViewInitialized = false;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef
  ) { }

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
    this.componentRef = this._viewContainerRef.createComponent(factory);
    this.componentRef.changeDetectorRef.detectChanges();
    this.componentUpdated.emit(this.componentRef);
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}