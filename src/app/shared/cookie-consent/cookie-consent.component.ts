import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DynamicDialogService } from '../dynamic-dialog/dynamic-dialog.service';
import { CardComponent } from '../card/card.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CardComponent, NgClass],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookieConsentComponent  {
  activeTab: 'consent' | 'details' | 'about' = 'consent';
  dialogService = inject(DynamicDialogService);
  cookieGroups = [{
    name: 'Authentication (Mandatory can\'t be dennied)',
    cookies: [
     'cookies-consent',
     'firebase-heartbeat-database',
     'firebaseLocalStorageDb'
    ]
  }];
  setActiveTab(tab: 'consent' | 'details' | 'about') {
    this.activeTab = tab;
  }
}
