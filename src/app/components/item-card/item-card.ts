import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <-- Додано імпорт
import { ProductDiscount } from '../../Shared/Models/product-discount.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- Додано сюди
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() discountItem!: ProductDiscount;
  @Output() selectItem = new EventEmitter<ProductDiscount>();

  protected readonly Math = Math;
  private today: Date = new Date('2025-10-17');

  public isExpiringSoon(): boolean {
    if (!this.discountItem) {
      return false;
    }
    const validUntilDate = new Date(this.discountItem.validUntil);
    const diffTime = validUntilDate.getTime() - this.today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  }

  onDetailsClick(): void {
    this.selectItem.emit(this.discountItem);
  }
}
