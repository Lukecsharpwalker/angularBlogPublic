import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {

}
