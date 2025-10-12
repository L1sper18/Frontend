import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// ВИПРАВЛЕНО: Правильний шлях до компонента item-card
import { ItemCardComponent } from '../item-card/item-card';
// ВИПРАВЛЕНО: Правильний шлях до моделі
import { ProductDiscount } from '../../Shared/Models/product-discount.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {
  discounts: ProductDiscount[] = [
    {
      id: 1,
      productName: 'Молоко "Галичина" 2.5%',
      storeName: 'АТБ',
      originalPrice: 45.50,
      discountPrice: 38.90,
      validUntil: new Date('2025-10-20'),
      imageUrl: 'https://src.zakaz.atbmarket.com/cache/photos/10/10050/10050_276x276.jpg'
    },
    {
      id: 2,
      productName: 'Хліб "Київський"',
      storeName: 'Сільпо',
      originalPrice: 28.00,
      discountPrice: 24.50,
      validUntil: new Date('2025-10-18')
    },
    {
      id: 3,
      productName: 'Куряче філе "Наша Ряба"',
      storeName: 'Фора',
      originalPrice: 180.00,
      discountPrice: 155.00,
      validUntil: new Date('2025-10-19'),
      imageUrl: 'https://src.zakaz.atbmarket.com/cache/photos/20822/20822_276x276.jpg'
    }
  ];
}

export class ItemsList {
}
