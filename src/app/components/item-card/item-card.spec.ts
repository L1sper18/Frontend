import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card';
import { provideRouter } from '@angular/router'; // Потрібен для RouterLink
import { By } from '@angular/platform-browser';
import { ProductDiscount } from '../../Shared/Models/product-discount.model';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  // Тестові дані
  const mockItem: ProductDiscount = {
    id: 1,
    productName: 'Тестове Молоко',
    storeName: 'АТБ',
    originalPrice: 50,
    discountPrice: 40,
    validUntil: new Date('2025-12-31'),
    imageUrl: 'milk.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardComponent],
      providers: [provideRouter([])] // Імітуємо роутер
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;

    // Передаємо дані в Input
    component.discountItem = mockItem;

    // Запускаємо оновлення HTML
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct product name', () => {
    // Шукаємо елемент h3
    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent).toContain('Тестове Молоко');
  });

  it('should display correct discount price', () => {
    const priceElement = fixture.debugElement.query(By.css('.discount-price')).nativeElement;
    // Pipe currency додає символ валюти, тому перевіряємо частковий збіг або форматований текст
    expect(priceElement.textContent).toContain('40.00');
  });

  it('should check if hot badge is displayed for high discount', () => {
    // У нас знижка 20% ( (50-40)/50 * 100 ), це > 13%, тому бейдж має бути
    const badge = fixture.debugElement.query(By.css('.hot-badge'));
    expect(badge).toBeTruthy();
  });
});
