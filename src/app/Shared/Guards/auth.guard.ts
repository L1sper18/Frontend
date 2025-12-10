import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastService } from '../Services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    toastService.show('Доступ заборонено! Будь ласка, увійдіть.', 'error');
    router.navigate(['/login']);
    return false;
  }
};
