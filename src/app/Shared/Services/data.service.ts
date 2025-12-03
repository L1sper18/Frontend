import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; // <-- Додали імпорти
import { isPlatformBrowser } from '@angular/common'; // <-- Додали імпорт
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductDiscount } from '../Models/product-discount.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'items';
  private itemsSubject = new BehaviorSubject<ProductDiscount[]>([]);
  public items$: Observable<ProductDiscount[]> = this.itemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // <-- Отримуємо ID платформи
  ) {
    this.loadItems();
  }

  private loadItems(): void {
    // ВАЖЛИВО: Робимо запит ТІЛЬКИ якщо ми в браузері
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<ProductDiscount[]>(this.apiUrl)
        .pipe(catchError(this.handleError))
        .subscribe(data => {
          this.itemsSubject.next(data);
        });
    }
  }

  public updateFilter(searchTerm: string): void {
    // Теж перевіряємо, чи ми в браузері
    if (isPlatformBrowser(this.platformId)) {
      const term = searchTerm.toLowerCase().trim();
      let url = this.apiUrl;
      if (term) {
        url += `?q=${term}`;
      }

      this.http.get<ProductDiscount[]>(url)
        .pipe(catchError(this.handleError))
        .subscribe(data => {
          this.itemsSubject.next(data);
        });
    }
  }

  public getItemById(id: number): Observable<ProductDiscount> {
    return this.http.get<ProductDiscount>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public addItem(newItem: Omit<ProductDiscount, 'id'>): Observable<ProductDiscount> {
    return this.http.post<ProductDiscount>(this.apiUrl, newItem)
      .pipe(
        tap(() => this.loadItems()),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Сталася помилка API:', error);
    let errorMessage = 'Щось пішло не так; спробуйте пізніше.';
    return throwError(() => new Error(errorMessage));
  }
}
