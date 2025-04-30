import {
  Component,
  ViewContainerRef,
  afterNextRender,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieConsentService } from './shared/cookie-consent/cookie-consent.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // cookieConsentService = inject(CookieConsentService);
  // viewContainerRef = inject(ViewContainerRef);

  constructor() {
    console.log('AppComponent');
    // afterNextRender(() =>
    //   this.cookieConsentService.showCookieConsent(this.viewContainerRef),
    // );
  }
}
