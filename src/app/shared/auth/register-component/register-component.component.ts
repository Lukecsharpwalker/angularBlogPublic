import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponentComponent {

}
