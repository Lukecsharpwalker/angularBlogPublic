import { Injectable, EnvironmentInjector, inject, ComponentRef, Type, WritableSignal, signal } from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig } from '../_models/modal-config.intreface';
import { ModalStatusEnum } from '../_models/modal-status.interface';

@Injectable({ providedIn: 'root' })
export class DynamicDialogService {

  private envInjector = inject(EnvironmentInjector);
  private componentRef!: ComponentRef<DynamicDialogComponent>;
  private closeRef$ = new Subject<ModalStatusEnum>();


  openDialog<C extends Type<unknown>>(component: C, viewContainerRef: ViewContainerRef, modalConfig?: ModalConfig): Subject<ModalStatusEnum> {
    this.componentRef =
      viewContainerRef.createComponent(DynamicDialogComponent, { environmentInjector: this.envInjector });
    this.componentRef.instance.component = component;
    this.componentRef.instance.modalConfig = modalConfig;
    return this.closeRef$;
  };

  closeDialog(status: ModalStatusEnum) {
    this.componentRef.destroy();
    this.closeRef$.next(status);
  };
}
