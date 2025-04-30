import {
  Component,
  ViewContainerRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieConsentService } from './shared/cookie-consent/cookie-consent.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  cookieConsentService = inject(CookieConsentService);
  viewContainerRef = inject(ViewContainerRef);

  constructor() {
    this.showCookieConsent();
  }

  private showCookieConsent() {
    afterNextRender(() =>
      this.cookieConsentService.showCookieConsent(this.viewContainerRef),
    );
  }
}
