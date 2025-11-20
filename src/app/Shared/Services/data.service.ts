import { Injectable } from '@angular/core';
import { ProductDiscount } from '../Models/product-discount.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private discounts: ProductDiscount[] = [
    {
      id: 1,
      productName: 'Молоко "Яготинське" 2.6%',
      storeName: 'АТБ',
      originalPrice: 48.30,
      discountPrice: 38.90,
      validUntil: new Date('2025-10-20'),
      imageUrl: 'assets/image/milk.webp'
    },
    {
      id: 2,
      productName: 'Хліб "Київський" гречаний',
      storeName: 'Сільпо',
      originalPrice: 28.00,
      discountPrice: 24.50,
      validUntil: new Date('2025-10-18'),
      imageUrl: 'assets/image/hlib_grechaniy.webp'
    },
    {
      id: 3,
      productName: 'Куряче філе "Наша Ряба"',
      storeName: 'Фора',
      originalPrice: 243.00,
      discountPrice: 198.00,
      validUntil: new Date('2025-10-19'),
      imageUrl: 'assets/image/chicken.png'
    }
  ];

  private itemsSubject = new BehaviorSubject<ProductDiscount[]>(this.discounts);
  public items$: Observable<ProductDiscount[]> = this.itemsSubject.asObservable();

  constructor() { }

  public updateFilter(searchTerm: string): void {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      this.itemsSubject.next(this.discounts);
      return;
    }

    const filteredItems = this.discounts.filter(item =>
      item.productName.toLowerCase().includes(term) ||
      item.storeName.toLowerCase().includes(term)
    );

    this.itemsSubject.next(filteredItems);
  }

  // (Завдання 7) Доданий метод
  public getItemById(id: number): ProductDiscount | undefined {
    return this.discounts.find(item => item.id === id);
  }
}
