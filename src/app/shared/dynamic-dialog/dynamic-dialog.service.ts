import { Injectable, EnvironmentInjector, inject, Component, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { ViewContainerRef } from '@angular/core';

@Injectable()
export class DynamicDialogService {

  private envInjector = inject(EnvironmentInjector);
  private viewContainerRef = inject(ViewContainerRef);

  openDialog<C>(component: C): void {
    const componentRef =
      this.viewContainerRef.createComponent(DynamicDialogComponent, { environmentInjector: this.envInjector });

    componentRef.instance.component = component;
    const domElem =
      (componentRef.hostView as EmbeddedViewRef<DynamicDialogComponent>).rootNodes[0] as HTMLElement;
      
    document.body.appendChild(domElem);
    componentRef.onDestroy(() => {
      document.body.removeChild(domElem);
      this.viewContainerRef.remove();
    });
  }
}
