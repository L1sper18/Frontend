import { Injectable } from '@angular/core';
import { ProductDiscount } from '../Models/product-discount.model';

@Injectable({
  providedIn: 'root' // Реєструємо сервіс на рівні всього додатку
})
export class DataService {

  /**
   * (Крок 3)
   * Масив з mock-даними, перенесений з items-list.component.
   */
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

  constructor() { }

  /**
   * (Крок 4)
   * Метод, який повертає масив з даними.
   */
  public getItems(): ProductDiscount[] {
    return this.discounts;
  }
}
