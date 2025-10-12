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
}
