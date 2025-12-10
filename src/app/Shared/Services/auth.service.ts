import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<any>(null); // Зберігаємо дані користувача
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  private apiUrl = 'users'; // URL до users у db.json

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkToken();
  }

  private checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      const user = localStorage.getItem(this.userKey);

      if (token && user) {
        this.isAuthenticated.set(true);
        this.currentUser.set(JSON.parse(user));
      }
    }
  }

  // Реєстрація нового користувача
  register(userData: any): Observable<any> {
    // Спочатку перевіряємо, чи існує користувач з таким email
    return this.http.get<any[]>(`${this.apiUrl}?email=${userData.email}`).pipe(
      tap(users => {
        if (users.length > 0) {
          throw new Error('Користувач з таким email вже існує');
        }
      }),
      // Якщо не існує, додаємо нового
      catchError(err => {
        if (err.message === 'Користувач з таким email вже існує') return throwError(() => err);
        // Продовжуємо потік, якщо користувача не знайдено (це добре для реєстрації)
        return of(null);
      }),
      // Виконуємо POST запит для створення
      map(() => {
        return this.http.post(this.apiUrl, userData);
      }),
      // Розпаковуємо Observable (flattening)
      tap(resultObs => resultObs.subscribe())
    );
    // Примітка: для спрощення в лабораторній можна просто робити POST,
    // але json-server не валідує унікальність, тому краще перевірити.

    // ПРОСТИЙ ВАРІАНТ (без перевірки унікальності, щоб не ускладнювати код):
    // return this.http.post(this.apiUrl, userData);
  }

  // Спрощений метод реєстрації для надійності в лабі:
  simpleRegister(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Логін (шукаємо користувача в масиві)
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            const fakeToken = 'jwt-token-' + user.id + '-' + new Date().getTime();

            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem(this.tokenKey, fakeToken);
              localStorage.setItem(this.userKey, JSON.stringify(user));
            }

            this.isAuthenticated.set(true);
            this.currentUser.set(user);
            return user;
          } else {
            throw new Error('Невірний email або пароль');
          }
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }
}
