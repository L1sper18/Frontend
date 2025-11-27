import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../Shared/Services/data.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Імпортуємо модуль реактивних форм
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
    // Створення форми з валідаторами
    this.itemForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      storeName: ['', Validators.required],
      originalPrice: [null, [Validators.required, Validators.min(0.01)]],
      discountPrice: [null, [Validators.required, Validators.min(0.01)]],
      validUntil: ['', Validators.required],
      imageUrl: [''] // Поле необов'язкове
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      // Отримуємо значення з форми
      const formValue = this.itemForm.value;

      // Готуємо об'єкт для сервісу (конвертуємо рядок дати в об'єкт Date)
      const newItem = {
        productName: formValue.productName,
        storeName: formValue.storeName,
        originalPrice: Number(formValue.originalPrice),
        discountPrice: Number(formValue.discountPrice),
        validUntil: new Date(formValue.validUntil),
        imageUrl: formValue.imageUrl || '' // Якщо пусто, буде порожній рядок (у картці є заглушка)
      };

      // Викликаємо сервіс
      this.dataService.addItem(newItem);

      // Перенаправляємо користувача назад до списку
      this.router.navigate(['/items']);
    } else {
      // Якщо форма невалідна, позначаємо всі поля як "доторкані", щоб показати помилки
      this.itemForm.markAllAsTouched();
    }
  }
}
