import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list';
import { DataService } from '../../Shared/Services/data.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

describe('ItemsListComponent Integration', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let mockDataService: any;

  const mockItems = [
    { id: 1, productName: 'Item 1', storeName: 'Store 1', originalPrice: 100, discountPrice: 90, validUntil: new Date(), imageUrl: '' },
    { id: 2, productName: 'Item 2', storeName: 'Store 2', originalPrice: 200, discountPrice: 150, validUntil: new Date(), imageUrl: '' }
  ];

  beforeEach(async () => {
    // Створюємо мок сервісу
    mockDataService = {
      items$: of(mockItems), // Повертаємо Observable з даними
      updateFilter: jasmine.createSpy('updateFilter')
    };

    await TestBed.configureTestingModule({
      imports: [ItemsListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(), // Потрібен, бо компонент може його тягнути
        { provide: DataService, useValue: mockDataService } // Підміняємо реальний сервіс на мок
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ініціалізація і перший рендер
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render exact number of item-cards based on data service', () => {
    // Шукаємо всі теги app-item-card
    const cards = fixture.debugElement.queryAll(By.css('app-item-card'));
    expect(cards.length).toBe(2);
  });

  it('should pass correct data to child component', () => {
    const firstCard = fixture.debugElement.query(By.css('app-item-card'));
    // Перевіряємо, чи передались дані в input [discountItem]
    expect(firstCard.componentInstance.discountItem.productName).toBe('Item 1');
  });
});
