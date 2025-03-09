import {
  Injectable,
  EnvironmentInjector,
  inject,
  ComponentRef,
  Type,
  Injector,
} from '@angular/core';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig } from '../_models/modal-config.intreface';
import { ModalStatus } from '../_models/modal-status.interface';
import { DYNAMIC_DIALOG_DATA } from './dialog-data.token';

@Injectable({ providedIn: 'root' })
export class DynamicDialogService<T> {
  private envInjector = inject(EnvironmentInjector);
  private componentRef!: ComponentRef<DynamicDialogComponent>;
  private closeRef$ = new Subject<ModalStatus<T>>();
  private injector = inject(Injector);

  openDialog<C>(
    viewContainerRef: ViewContainerRef,
    modalConfig?: ModalConfig,
    component?: Type<C>,
  ): Subject<ModalStatus<T>> {
    const dialogInjector = Injector.create({
      providers: [
        { provide: DYNAMIC_DIALOG_DATA, useValue: modalConfig?.data },
      ],
      parent: this.injector,
    });

    this.componentRef = viewContainerRef.createComponent(
      DynamicDialogComponent,
      { environmentInjector: this.envInjector, injector: dialogInjector },
    );
    if (component) {
      this.componentRef.instance.component = component;
    }
    this.componentRef.instance.modalConfig = modalConfig;
    return this.closeRef$;
  }

  closeDialog(status: ModalStatus<T>) {
    this.componentRef.destroy();
    this.closeRef$.next(status);
  }
}
