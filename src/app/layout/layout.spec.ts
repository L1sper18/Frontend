import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../Shared/Services/auth.service';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [
        provideRouter([]),      // Для RouterLink
        provideHttpClient(),    // Для AuthService -> HttpClient
        provideHttpClientTesting(),
        AuthService             // Сервіс авторизації
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assume user is not logged in by default', () => {
    // Перевіряємо початковий стан (кнопка "Вхід" має бути)
    const compiled = fixture.nativeElement as HTMLElement;
    const loginBtn = compiled.querySelector('.login-btn');
    expect(loginBtn).toBeTruthy();
  });
});
