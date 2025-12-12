import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductDiscount } from '../Models/product-discount.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);

    // --- ВИПРАВЛЕННЯ ---
    // Сервіс у конструкторі викликає loadItems(), що робить запит GET 'items'.
    // Ми мусимо перехопити цей запит, щоб він не висів "відкритим".
    const initReq = httpMock.expectOne('items');
    initReq.flush([]); // Віддаємо порожній масив, щоб сервіс заспокоївся
    // -------------------
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a single item by ID via GET', () => {
    const dummyItem: ProductDiscount = {
      id: 1,
      productName: 'Test Product',
      storeName: 'Test Store',
      originalPrice: 100,
      discountPrice: 80,
      validUntil: new Date(),
      imageUrl: 'test.jpg'
    };

    // Викликаємо метод отримання по ID
    service.getItemById(1).subscribe(item => {
      expect(item).toEqual(dummyItem);
    });

    // Очікуємо запит саме на items/1
    const req = httpMock.expectOne('items/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyItem);
  });
});
