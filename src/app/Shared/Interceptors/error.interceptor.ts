import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../Services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Сталася невідома помилка';

      if (error.error instanceof ErrorEvent) {
        // Помилка на стороні клієнта (мережа і т.д.)
        errorMessage = `Помилка з'єднання: ${error.error.message}`;
      } else {
        // Помилка від сервера (404, 500 тощо)
        switch (error.status) {
          case 400:
            errorMessage = 'Невірний запит (400)';
            break;
          case 401:
            errorMessage = 'Ви не авторизовані (401)';
            break;
          case 403:
            errorMessage = 'Доступ заборонено (403)';
            break;
          case 404:
            errorMessage = 'Ресурс не знайдено (404)';
            break;
          case 500:
            errorMessage = 'Помилка сервера (500). Спробуйте пізніше.';
            break;
          case 0:
            errorMessage = 'Сервер не відповідає. Перевірте, чи запущено json-server.';
            break;
          default:
            errorMessage = `Помилка: ${error.status} ${error.statusText}`;
        }
      }

      // Показуємо червоне повідомлення
      toastService.show(errorMessage, 'error');

      // Прокидаємо помилку далі
      return throwError(() => error);
    })
  );
};
