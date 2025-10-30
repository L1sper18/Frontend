import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemCardComponent } from '../item-card/item-card';
import { ProductDiscount } from '../../Shared/Models/product-discount.model';
import { DataService } from '../../Shared/Services/data.service'; // (Крок 5) Імпортуємо сервіс

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    FormsModule
  ],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {

  // (Крок 3) Масив з даними видалено. Тепер це пусті масиви.
  discounts: ProductDiscount[] = [];
  public filteredDiscounts: ProductDiscount[] = [];

  private _searchTerm: string = '';

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterDiscounts();
  }

  /**
   * (Крок 5)
   * Впроваджуємо (інжектуємо) сервіс у конструктор.
   */
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    /**
     * (Крок 6)
     * Отримуємо дані з сервісу при ініціалізації компонента.
     */
    this.discounts = this.dataService.getItems();

    // Фільтруємо дані, які щойно отримали
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

  onItemSelected(item: ProductDiscount): void {
    console.log('Обраний елемент (з батьківського компонента):', item);
    alert(`Ви обрали: ${item.productName}\nМагазин: ${item.storeName}\nЦіна: ${item.discountPrice} грн`);
  }
}
