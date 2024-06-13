import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogComponent implements OnInit{
  @Input() component: any;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  viewContainer = inject(ViewContainerRef);

  ngOnInit(): void {
    if (this.component) {
      this.container.createComponent(this.component);
    }
  }

}
