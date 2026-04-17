import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http: HttpClient = inject(HttpClient);

  checkOut(cartId: string, address: object,): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.currentServer}`,
      {
        "shippingAddress": address
      }
    )
  }
}
