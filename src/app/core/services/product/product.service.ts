import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http: HttpClient = inject(HttpClient)


  getAllProdects(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/products`)
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
