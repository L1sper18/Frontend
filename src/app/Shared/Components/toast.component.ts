import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../Shared/Services/toast.service'; // Перевір шлях імпорту

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toastService.toastState(); as msg) {
      <div class="toast" [ngClass]="msg.type">
        <span>{{ msg.text }}</span>
        <button class="close-btn" (click)="toastService.close()">×</button>
      </div>
    }
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      display: flex;
      align-items: center;
      gap: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      font-family: 'Montserrat', sans-serif;
      min-width: 250px;
      justify-content: space-between;
    }
    .error { background-color: #e74c3c; }   /* Червоний */
    .success { background-color: #27ae60; } /* Зелений */
    .info { background-color: #3498db; }    /* Синій */

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      line-height: 1;
      padding: 0;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
