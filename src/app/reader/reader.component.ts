import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReaderComponent {

}
