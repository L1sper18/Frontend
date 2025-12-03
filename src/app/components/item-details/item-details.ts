import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDiscount } from '../../Shared/Models/product-discount.model';
import { DataService } from '../../Shared/Services/data.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css']
})
export class ItemDetailsComponent implements OnInit {
  item: ProductDiscount | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // БУЛО: this.item = this.dataService.getItemById(id);
      // СТАЛО: (чекаємо відповідь від сервера)
      this.dataService.getItemById(id).subscribe({
        next: (data) => this.item = data,
        error: (err) => console.error('Товар не знайдено', err)
      });
    }
  }
}
