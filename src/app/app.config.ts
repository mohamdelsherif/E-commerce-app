import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions(), withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([
      errorsInterceptor,
      loadingInterceptor,
      headerInterceptor
    ])),
    provideToastr(),
    importProvidersFrom([NgxSpinnerModule]),
  ]
};
