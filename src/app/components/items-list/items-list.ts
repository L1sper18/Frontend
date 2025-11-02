import { Component, OnInit, OnDestroy } from '@angular/core'; // (Завдання 3) Додано OnDestroy
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs'; // (Завдання 3) Для відписки
import { takeUntil } from 'rxjs/operators'; // (Завдання 3) Для відписки

import { ItemCardComponent } from '../item-card/item-card';
import { ProductDiscount } from '../../Shared/Models/product-discount.model';
import { DataService } from '../../Shared/Services/data.service';

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
export class ItemsListComponent implements OnInit, OnDestroy { // (Завдання 3)

  // (Завдання 3) Масив 'discounts' видалено, він більше не потрібен
  public filteredDiscounts: ProductDiscount[] = [];

  private _searchTerm: string = '';

  // (Завдання 3) Створюємо Subject для керування відпискою
  private destroy$ = new Subject<void>();

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    /**
     * (Завдання 5)
     * Замість локальної фільтрації, ми надсилаємо
     * запит на фільтрацію до сервісу.
     */
    this.dataService.updateFilter(value);
  }

  /**
   * (Крок 5)
   * Впроваджуємо (інжектуємо) сервіс у конструктор.
   */
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    /**
     * (Завдання 3)
     * Підписуємось на Observable 'items$' з сервісу.
     * Будь-які зміни в 'itemsSubject' (в сервісі)
     * автоматично оновлять наш 'filteredDiscounts'.
     *
     * (Завдання 3)
     * 'takeUntil(this.destroy$)' автоматично відпишеться
     * від Observable, коли 'destroy$' випромінить значення
     * (це станеться в ngOnDestroy).
     */
    this.dataService.items$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(items => {
        this.filteredDiscounts = items;
      });
  }

  /**
   * (Завдання 3)
   * Цей метод життєвого циклу викликається, коли
   * компонент знищується.
   */
  ngOnDestroy(): void {
    // Випромінюємо значення, щоб спрацював 'takeUntil'
    this.destroy$.next();
    // Завершуємо Subject
    this.destroy$.complete();
  }

  /**
   * (Завдання 5)
   * Метод filterDiscounts() видалено, оскільки
   * ця логіка тепер знаходиться в DataService.
   */

  trackById(index: number, item: ProductDiscount): number {
    return item.id;
  }

  onItemSelected(item: ProductDiscount): void {
    console.log('Обраний елемент (з батьківського компонента):', item);
    alert(`Ви обрали: ${item.productName}\nМагазин: ${item.storeName}\nЦіна: ${item.discountPrice} грн`);
  }
}
