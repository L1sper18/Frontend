import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // <-- 1. Імпортуємо RouterLink
import { Observable } from 'rxjs';

import { ItemCardComponent } from '../item-card/item-card';
import { ProductDiscount } from '../../Shared/Models/product-discount.model';
import { DataService } from '../../Shared/Services/data.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    FormsModule,
    AsyncPipe,
    RouterLink // <-- 2. Додаємо сюди, щоб шаблон "розумів" routerLink
  ],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {

  // Замість масиву використовуємо Observable напряму
  public items$: Observable<ProductDiscount[]>;

  private _searchTerm: string = '';

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.dataService.updateFilter(value);
  }

  constructor(private dataService: DataService) {
    // Просто присвоюємо потік даних змінній
    this.items$ = this.dataService.items$;
  }

  trackById(index: number, item: ProductDiscount): number {
    return item.id;
  }

  onItemSelected(item: ProductDiscount): void {
    console.log('Обраний елемент:', item);
    alert(`Ви обрали: ${item.productName}`);
  }
}
