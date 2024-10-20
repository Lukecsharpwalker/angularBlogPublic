import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddImageControls } from './add-image-controls.interface';

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddImageComponent {
  form = new FormGroup<AddImageControls>({
    src: new FormControl<string | null>(''),
    alt: new FormControl<string | null>(''),
  })
}





