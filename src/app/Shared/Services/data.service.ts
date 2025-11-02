import { Injectable } from '@angular/core';
import { ProductDiscount } from '../Models/product-discount.model';
import { BehaviorSubject, Observable } from 'rxjs'; // (Завдання 2, 4) Імпортуємо

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * (Крок 3)
   * Масив з mock-даними (майстер-список).
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

  /**
   * (Завдання 4)
   * BehaviorSubject зберігає поточний стан (список) і
   * повідомляє всіх підписників про зміни.
   * Початкове значення - повний список.
   */
  private itemsSubject = new BehaviorSubject<ProductDiscount[]>(this.discounts);

  /**
   * (Завдання 4)
   * Публічний Observable, на який будуть підписуватись компоненти.
   */
  public items$: Observable<ProductDiscount[]> = this.itemsSubject.asObservable();


  constructor() { }

  /**
   * (Завдання 5)
   * Метод для оновлення фільтра.
   * Він приймає пошуковий запит, фільтрує майстер-список
   * і надсилає (next) новий відфільтрований масив у BehaviorSubject.
   * Всі, хто підписаний на items$, отримають цей новий масив.
   */
  public updateFilter(searchTerm: string): void {
    const term = searchTerm.toLowerCase().trim();

    // Якщо пошук порожній, повертаємо повний список
    if (!term) {
      this.itemsSubject.next(this.discounts);
      return;
    }

    // Фільтруємо майстер-список
    const filteredItems = this.discounts.filter(item =>
      item.productName.toLowerCase().includes(term) ||
      item.storeName.toLowerCase().includes(term)
    );

    // Надсилаємо новий відфільтрований список у потік
    this.itemsSubject.next(filteredItems);
  }

  /**
   * (Завдання 2)
   * Метод getItems() тепер повертає Observable з даними.
   * Хоча в фінальній реалізації (Завдання 4, 5) він не використовується
   * компонентом (оскільки компонент підписується на items$),
   * ми реалізуємо його згідно з завданням 2.
   *
   * import { of } from 'rxjs';
   *
   * public getItems(): Observable<ProductDiscount[]> {
   * return of(this.discounts);
   * }
   *
   * Примітка: Ми реалізували більш просунутий патерн
   * з BehaviorSubject (Завдання 4, 5), який замінює
   * необхідність одноразового виклику getItems().
   */
}
