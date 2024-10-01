import { ChangeDetectionStrategy, Component, Input, OnInit, Type, ViewContainerRef, inject, viewChild } from '@angular/core';
import { DynamicDialogService } from './dynamic-dialog.service';
import { ModalConfig } from '../_models/modal-config.intreface';
import { ModalStatusEnum } from '../_models/modal-status.interface';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogComponent<C = unknown> implements OnInit{
  @Input() component?: Type<C>;
  @Input() modalConfig?: ModalConfig;

  divEl = viewChild.required('dynamicComponentContainer', {read: ViewContainerRef});

  dynamicDialogService = inject(DynamicDialogService);
  viewContainerRef = inject(ViewContainerRef);
  ModalStatusEnum = ModalStatusEnum;

  ngOnInit(): void {
    if (this.divEl() && this.component) {
      this.divEl().createComponent(this.component);
    }
  }

  closeDialog(status: ModalStatusEnum) {
    this.dynamicDialogService.closeDialog(status);
  }

}
