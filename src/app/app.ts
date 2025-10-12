import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Layout} from './layout/layout';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Layout
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title: WritableSignal<string> = signal('angular-app');
}
