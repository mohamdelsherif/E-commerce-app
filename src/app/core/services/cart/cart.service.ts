import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICartResponse } from '../../models/productItem/product-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http: HttpClient = inject(HttpClient);

  // Signals لإدارة حالة السلة في التطبيق بالكامل
  numOfCartItems = signal<number>(0);
  cartProductIds = signal<string[]>([]);

  /**
   * جلب منتجات السلة وتحديث الحالة
   */
  getCartItems(): Observable<ICartResponse> {
    return this.http.get<ICartResponse>(`${environment.baseUrl}/api/v2/cart`).pipe(
      tap((res) => {
        // الـ TypeScript دلوقتي فاهم إن res فيها numOfCartItems
        this.numOfCartItems.set(res.numOfCartItems);

        // وفاهم إن res.data.products عبارة عن مصفوفة
        const ids = res.data.products.map((item) => item.product._id);
        this.cartProductIds.set(ids);
      })
    );
  }

  /**
   * إضافة منتج جديد للسلة
   */
  addProduct(pId: string): Observable<ICartResponse> {
    return this.http.post<ICartResponse>(`${environment.baseUrl}/api/v2/cart`, {
      productId: pId
    }).pipe(
      tap((res) => {
        // تحديث الـ Signal بالعدد الجديد بعد الإضافة
        this.numOfCartItems.set(res.numOfCartItems);
      })
    );
  }

  /**
   * حذف منتج واحد من السلة
   */
  deleteItem(proId: string): Observable<ICartResponse> {
    return this.http.delete<ICartResponse>(`${environment.baseUrl}/api/v2/cart/${proId}`).pipe(
      tap((res) => {
        this.numOfCartItems.set(res.numOfCartItems);
      })
    );
  }

  /**
   * تعديل كمية منتج معين (زيادة أو نقصان)
   */
  editItemQ(proId: string, count: number): Observable<ICartResponse> {
    return this.http.put<ICartResponse>(`${environment.baseUrl}/api/v2/cart/${proId}`, {
      "count": count
    }).pipe(
      tap((res) => {
        this.numOfCartItems.set(res.numOfCartItems);
      })
    );
  }

  /**
   * مسح السلة بالكامل
   */
  clearAllItems(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v2/cart`).pipe(
      tap(() => {
        // إعادة تعيين الحالة للصفر
        this.numOfCartItems.set(0);
        this.cartProductIds.set([]);
      })
    );
  }

  /**
   * دالة مساعدة لتحديث الـ IDs يدوياً إذا لزم الأمر
   */
  updateCartIds(ids: string[]) {
    this.cartProductIds.set(ids);
  }

  /**
   * دالة لجلب الحالة فوراً (مفيدة للاستدعاء السريع في ngOnInit)
   */
  getCartStatus(): void {
    this.getCartItems().subscribe();
  }
}
