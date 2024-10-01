import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth/auth.service';
import { authInnitializer } from './utlis/initialize-auth';
import { provideQuillConfig } from 'ngx-quill/config';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { quillToolbarConfig } from './utlis/quill-toolbar';
import hljs from 'highlight.js/lib/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    {
      provide: APP_INITIALIZER,
      useFactory: authInnitializer,
      deps: [AuthService],
      multi: true,
    },
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        xml: () => import('highlight.js/lib/languages/xml'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        javascript: () => import('highlight.js/lib/languages/javascript'),
        css: () => import('highlight.js/lib/languages/css'),
        plain: () => import('highlight.js/lib/languages/plaintext'),
      },
    }),
    provideQuillConfig({
      modules: {
        syntax: { hljs},
        toolbar: quillToolbarConfig
      }
    }),
  ],
};
