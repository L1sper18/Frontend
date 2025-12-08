import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Layout} from './layout/layout';
import {ToastComponent} from './Shared/Components/toast.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Layout,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title: WritableSignal<string> = signal('angular-app');
}
