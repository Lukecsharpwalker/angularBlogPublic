import { Injectable, EnvironmentInjector, inject, Component, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DynamicDialogService {

  private envInjector = inject(EnvironmentInjector);
  private componentRef!: ComponentRef<DynamicDialogComponent>;

  openDialog<C>(component: C, viewContainerRef: ViewContainerRef): void {
    this.componentRef =
      viewContainerRef.createComponent(DynamicDialogComponent, { environmentInjector: this.envInjector });

    this.componentRef.instance.component = component;
    const domElem =
      (this.componentRef.hostView as EmbeddedViewRef<DynamicDialogComponent>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  closeDialog() {
    this.componentRef.destroy();
  }
}
