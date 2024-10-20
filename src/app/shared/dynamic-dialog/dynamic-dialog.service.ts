import { Injectable, EnvironmentInjector, inject, ComponentRef, Type } from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig } from '../_models/modal-config.intreface';
import { ModalStatus } from '../_models/modal-status.interface';

@Injectable({ providedIn: 'root' })
export class DynamicDialogService <T>  {

  private envInjector = inject(EnvironmentInjector);
  private componentRef!: ComponentRef<DynamicDialogComponent>;
  private closeRef$ = new Subject<ModalStatus<T>>();


  openDialog<C>(viewContainerRef: ViewContainerRef, modalConfig?: ModalConfig, component?: Type<C>)
    : Subject<ModalStatus<T>> {
    this.componentRef =
      viewContainerRef.createComponent(DynamicDialogComponent, { environmentInjector: this.envInjector });
    if (component) {
      this.componentRef.instance.component = component;
    }
    this.componentRef.instance.modalConfig = modalConfig;
    return this.closeRef$;
  };

  closeDialog(status: ModalStatus<T>) {
    this.componentRef.destroy();
    this.closeRef$.next(status);
  };
}
