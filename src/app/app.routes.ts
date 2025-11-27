import { Routes } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list';
import { ItemDetailsComponent } from './components/item-details/item-details';
import { ItemFormComponent } from './components/item-form/item-form'; // <-- Імпорт

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemsListComponent },
  { path: 'add-item', component: ItemFormComponent }, // <-- Новий маршрут для форми
  { path: 'items/:id', component: ItemDetailsComponent },
  { path: '**', redirectTo: 'items' }
];
