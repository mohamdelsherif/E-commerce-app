import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getUserCart() {
    throw new Error('Method not implemented.');
  }
  private readonly http: HttpClient = inject(HttpClient)

  numOfCartItems = signal<number>(0);
  cartProductIds = signal<string[]>([]);

  getCartStatus(): void {
    this.getCartItems().subscribe({
      next: (res) => {
        this.numOfCartItems.set(res.numOfCartItems);

        const ids = res.data.products.map((item: any) => item.product._id);
        this.cartProductIds.set(ids);
      }
    });
  }

  addProduct(pId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v2/cart`,
      {
        productId: pId
      }
    )
  }

  getCartItems(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v2/cart`)
  }

  deleteItem(proId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v2/cart/${proId}`)
  }

  editItemQ(proId: string, count: number): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v2/cart/${proId}`,
      {
        "count": count
      }
    )
  }
  clearAllItems(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v2/cart`)
  }
  updateCartIds(ids: string[]) {
    this.cartProductIds.set(ids);
  }

}
