import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { baseUrlInterceptor } from './Shared/Interceptors/base-url.interceptor';
import { errorInterceptor } from './Shared/Interceptors/error.interceptor';
// Додай цей імпорт:
import { authInterceptor } from './Shared/Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      // Додаємо authInterceptor до списку:
      withInterceptors([baseUrlInterceptor, authInterceptor, errorInterceptor])
    )
  ]
};
