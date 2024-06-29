import { Injectable, EnvironmentInjector, inject, ComponentRef, Type } from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DynamicDialogService {

  private envInjector = inject(EnvironmentInjector);
  private componentRef!: ComponentRef<DynamicDialogComponent>;

  openDialog<C extends Type<unknown>>(component: C, viewContainerRef: ViewContainerRef): void {
    this.componentRef =
      viewContainerRef.createComponent(DynamicDialogComponent, { environmentInjector: this.envInjector });
    this.componentRef.instance.component = component;
  };

  closeDialog() {
      this.componentRef.destroy();
  };
}
