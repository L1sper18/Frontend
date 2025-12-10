import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // <-- RouterLink потрібен для посилання "Увійти"
import { AuthService } from '../../Services/auth.service';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink // <-- Додаємо, щоб посилання "Увійти" працювало
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const { confirmPassword, ...newUser } = this.registerForm.value;
      newUser.role = 'user';

      this.authService.simpleRegister(newUser).subscribe({
        next: () => {
          this.toastService.show('Реєстрація успішна! Увійдіть.', 'success');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error(err);
          this.toastService.show('Помилка реєстрації.', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
