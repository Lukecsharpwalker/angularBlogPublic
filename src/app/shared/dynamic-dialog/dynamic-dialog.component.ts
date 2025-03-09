import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
  inject,
  viewChild,
} from '@angular/core';
import { DynamicDialogService } from './dynamic-dialog.service';
import { ModalConfig } from '../_models/modal-config.intreface';
import {
  ModalCloseStatusEnum,
  ModalStatus,
} from '../_models/modal-status.interface';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogComponent<C = unknown> implements OnInit {
  @Input() component?: Type<C>;
  @Input() modalConfig?: ModalConfig;

  divEl = viewChild.required('dynamicComponentContainer', {
    read: ViewContainerRef,
  });

  dynamicDialogService = inject(DynamicDialogService);
  componentRef?: ComponentRef<C>;
  ModalCloseStatusEnum = ModalCloseStatusEnum;

  ngOnInit(): void {
    if (this.divEl() && this.component) {
      this.componentRef = this.divEl().createComponent(this.component);
    }
  }

  closeDialog(
    modalCloseStatus: ModalCloseStatusEnum = ModalCloseStatusEnum.CLOSED,
  ) {
    const status = {
      data: this.componentRef?.instance,
      closeStatus: modalCloseStatus,
    } as ModalStatus;

    this.dynamicDialogService.closeDialog(status);
  }

  onOverlayClick($event: MouseEvent) {
    console.log('Overlay clicked', $event);
  }
}
