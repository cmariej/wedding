import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
      provideBrowserGlobalErrorListeners(),
      provideRouter(routes,
      withHashLocation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })),
      provideClientHydration(withEventReplay()),
      provideAnimationsAsync(),
      providePrimeNG({
        theme: {
          preset: Aura
        }
      }),
      MessageService,
    ]
};
