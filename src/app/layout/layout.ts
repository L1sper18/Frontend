import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // <-- Імпортуємо RouterLink
import { ItemsListComponent } from '../components/items-list/items-list';
import { AuthService } from '../Shared/Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ItemsListComponent,
    RouterLink, // <-- ОБОВ'ЯЗКОВО додаємо сюди, щоб кнопки працювали
    CommonModule
  ],
  templateUrl: './layout.html',
  styleUrls:['./layout.css']
})
export class Layout {
  title: string = 'Знижки в магазинах';
  Dodatok: string = 'App';

  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
