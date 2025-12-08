import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type: 'error' | 'success' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Signal для збереження стану повідомлення
  toastState = signal<ToastMessage | null>(null);

  // Метод для показу повідомлення
  show(text: string, type: 'error' | 'success' | 'info' = 'info') {
    this.toastState.set({ text, type });

    // Автоматично приховати через 4 секунди
    setTimeout(() => {
      this.close();
    }, 4000);
  }

  // Метод для закриття
  close() {
    this.toastState.set(null);
  }
}
