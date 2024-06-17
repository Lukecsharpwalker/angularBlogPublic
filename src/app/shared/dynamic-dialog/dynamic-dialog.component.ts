import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild, ViewContainerRef, inject, viewChild } from '@angular/core';
import { DynamicDialogService } from './dynamic-dialog.service';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogComponent implements OnInit{
  @Input() component: any;

  divEl = viewChild.required('dynamicComponentContainer', {read: ViewContainerRef});

  dynamicDialogService = inject(DynamicDialogService);
  viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    if (this.divEl()) {
      console.log(this.divEl());
      this.divEl().createComponent(this.component);

    }
  }
  closeDialog() {
    this.dynamicDialogService.closeDialog();
  }

}
