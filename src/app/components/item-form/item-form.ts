import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../Shared/Services/data.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemFormComponent {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      storeName: ['', Validators.required],
      originalPrice: [null, [Validators.required, Validators.min(0.01)]],
      discountPrice: [null, [Validators.required, Validators.min(0.01)]],
      validUntil: ['', Validators.required],
      imageUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;

      const newItem = {
        productName: formValue.productName,
        storeName: formValue.storeName,
        originalPrice: Number(formValue.originalPrice),
        discountPrice: Number(formValue.discountPrice),
        validUntil: formValue.validUntil, // json-server приймає рядок дати
        imageUrl: formValue.imageUrl || ''
      };

      // БУЛО: this.dataService.addItem(newItem); this.router.navigate...
      // СТАЛО: (чекаємо підтвердження збереження)
      this.dataService.addItem(newItem).subscribe({
        next: () => {
          this.router.navigate(['/items']);
        },
        error: (err) => {
          console.error('Помилка:', err);
          alert('Помилка при збереженні!');
        }
      });
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
}
