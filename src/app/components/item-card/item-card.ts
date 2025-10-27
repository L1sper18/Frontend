import { Component, Input, Output, EventEmitter } from '@angular/core'; // Додайте Output та EventEmitter
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
  @Input() discountItem!: ProductDiscount;
  @Output() selectItem = new EventEmitter<ProductDiscount>(); // (Завдання 3) Створюємо подію

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

  /**
   * (Завдання 3)
   * Обробник кліку на кнопку "Детальніше".
   * Випромінює подію "selectItem" з даними поточного товару.
   */
  onDetailsClick(): void {
    this.selectItem.emit(this.discountItem);
  }
}
