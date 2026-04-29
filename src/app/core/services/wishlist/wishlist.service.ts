import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IWishlistResponse } from '../../models/iwishlist/i-wishlist.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http: HttpClient = inject(HttpClient);


  wishlistCount = signal<number>(0);

  wishlistIds = signal<string[]>([]);

  getWishlistItems(): Observable<IWishlistResponse> {
    return this.http.get<IWishlistResponse>(`${environment.baseUrl}/api/v1/wishlist`).pipe(
      tap((res) => {

        this.wishlistCount.set(res.count);

        const ids = res.data.map((item: any) => item._id);
        this.wishlistIds.set(ids);
      })
    );
  }

  addProductToWishlist(prd: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/v1/wishlist`, {
      "productId": prd
    }).pipe(
      tap((res) => {

        if (res.data) {
          this.wishlistIds.set(res.data);
          this.wishlistCount.set(res.data.length);
        }
      })
    );
  }

  deleteItem(proId: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/v1/wishlist/${proId}`).pipe(
      tap((res) => {

        if (res.data) {
          this.wishlistIds.set(res.data);
          this.wishlistCount.set(res.data.length);
        }
      })
    );
  }
}
