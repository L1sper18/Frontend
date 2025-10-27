import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Імпорт для [(ngModel)] (Завдання 5)

import { ItemCardComponent } from '../item-card/item-card';
import { ProductDiscount } from '../../Shared/Models/product-discount.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    FormsModule // <-- Додано FormsModule сюди (Завдання 5)
  ],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {

  // Оновлені дані з картинками
  discounts: ProductDiscount[] = [
    {
      id: 1,
      productName: 'Молоко "Яготинське" 2.6%',
      storeName: 'АТБ',
      originalPrice: 48.30,
      discountPrice: 38.90,
      validUntil: new Date('2025-10-20'),
      imageUrl: 'assets/image/milk.webp' // Оновлено шлях
    },
    {
      id: 2,
      productName: 'Хліб "Київський" гречаний',
      storeName: 'Сільпо',
      originalPrice: 28.00,
      discountPrice: 24.50,
      validUntil: new Date('2025-10-18'),
      imageUrl: 'assets/image/hlib_grechaniy.webp' // Оновлено шлях
    },
    {
      id: 3,
      productName: 'Куряче філе "Наша Ряба"',
      storeName: 'Фора',
      originalPrice: 243.00,
      discountPrice: 198.00,
      validUntil: new Date('2025-10-19'),
      imageUrl: 'assets/image/chicken.png' // Оновлено шлях
    }
  ];

  public filteredDiscounts: ProductDiscount[] = [];
  private _searchTerm: string = '';

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterDiscounts();
  }

  ngOnInit(): void {
    this.filterDiscounts();
  }

  filterDiscounts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredDiscounts = this.discounts.filter(item =>
      item.productName.toLowerCase().includes(term) ||
      item.storeName.toLowerCase().includes(term)
    );
  }

  trackById(index: number, item: ProductDiscount): number {
    return item.id;
  }

  /**
   * (Завдання 4)
   * Обробник події "selectItem" від дочірнього компонента.
   * ЦЕ САМЕ ТОЙ КОД, ЯКИЙ МАЄ "ПРАЦЮВАТИ" ПРИ НАТИСКАННІ
   */
  onItemSelected(item: ProductDiscount): void {
    console.log('Обраний елемент (з батьківського компонента):', item);
    // Виводимо alert для наочності
    alert(`Ви обрали: ${item.productName}\nМагазин: ${item.storeName}\nЦіна: ${item.discountPrice} грн`);
  }
}
