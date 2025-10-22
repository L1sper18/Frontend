import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDiscount } from '../../Shared/Models/product-discount.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() discountItem!: ProductDiscount; // @Input() дозволяє приймати дані ззовні
  protected readonly Math = Math;
  private today: Date = new Date('2025-10-17');
  public isExpiringSoon(): boolean {
    // Переконуємось, що discountItem вже отримано
    if (!this.discountItem) {
      return false;
    }

    const validUntilDate = new Date(this.discountItem.validUntil);
    const diffTime = validUntilDate.getTime() - this.today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Показуємо, якщо термін 0, 1 або 2 дні
    return diffDays <= 2 && diffDays >= 0;
  }
}
