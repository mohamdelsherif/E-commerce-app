import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http: HttpClient = inject(HttpClient)


  addProductToWishlist(prd: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/wishlist`, {
      "productId": prd
    })
  }
  getWishlistItems(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

  deleteItem(proId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/wishlist/${proId}`)
  }

}
