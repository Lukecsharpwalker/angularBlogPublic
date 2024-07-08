import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { ModalStatusEnum } from '../_models/modal-status.interface';
import { DynamicDialogService } from '../dynamic-dialog/dynamic-dialog.service';
import { CookieConsentComponent } from './cookie-consent.component';
import { LocalStorageEnum } from '../_enums/local-storage';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  dialogService = inject(DynamicDialogService);

  showCookieConsent(viewContainerRef: ViewContainerRef): void {
    if (!localStorage.getItem(LocalStorageEnum.COOKIES_CONSENT)) {
      this.dialogService.openDialog(
        CookieConsentComponent,
        viewContainerRef,
        {
          primaryButton: 'Allow All',
          secondaryButton: 'Deny',
          title: 'Cookie Consent'
        }
      ).subscribe((status) => {
        if (status === ModalStatusEnum.ACCEPTED) {
          this.acceptCookies();
        }
        if (status === ModalStatusEnum.REJECTED) {
          this.denyCookies();
        }
        this.closePopup(status);
      });
    }
  }

  acceptCookies() {
    localStorage.setItem(LocalStorageEnum.COOKIES_CONSENT, 'true');
  }

  denyCookies() {
    localStorage.setItem(LocalStorageEnum.COOKIES_CONSENT, 'false');
  }

  closePopup(status: ModalStatusEnum) {
    this.dialogService.closeDialog(status);
  }
}
