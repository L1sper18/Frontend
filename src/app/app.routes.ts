import { Routes } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list';
import { ItemDetailsComponent } from './components/item-details/item-details';
import { ItemFormComponent } from './components/item-form/item-form';
import { LoginComponent } from './Shared/Components/login/login';
import { RegisterComponent } from './Shared/Components/register/register'; // <-- Імпорт
import { authGuard } from './Shared/Guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },      // <-- Маршрут реєстрації
  { path: 'items', component: ItemsListComponent },
  {
    path: 'add-item',
    component: ItemFormComponent,
    canActivate: [authGuard]
  },
  { path: 'items/:id', component: ItemDetailsComponent },
  { path: '**', redirectTo: 'items' }
];
