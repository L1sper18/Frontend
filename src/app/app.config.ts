import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // <-- Додали імпорти для HTTP

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { baseUrlInterceptor } from './Shared/Interceptors/base-url.interceptor'; // <-- Імпортуємо наш інтерцептор

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // Підключаємо HttpClient з підтримкою fetch та нашим інтерцептором
    provideHttpClient(
      withFetch(),
      withInterceptors([baseUrlInterceptor])
    )
  ]
};
