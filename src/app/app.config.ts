import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { baseUrlInterceptor } from './Shared/Interceptors/base-url.interceptor';
// Додай цей імпорт:
import { errorInterceptor } from './Shared/Interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      // Додай errorInterceptor сюди:
      withInterceptors([baseUrlInterceptor, errorInterceptor])
    )
  ]
};
