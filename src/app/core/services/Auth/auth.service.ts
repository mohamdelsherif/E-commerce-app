import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly platformService: PlatformService = inject(PlatformService);


  isLoggin = signal<boolean>(false);

  constructor() {
    if (this.platformService.isBrowser())
      this.checkLoggedIn();

  }
  login(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }
  signUp(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  sendEmail(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }
  sendCode(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }

  checkLoggedIn() {

    if (localStorage.getItem('freshToken'))
      this.isLoggin.set(true);
    else
      this.isLoggin.set(false);

  }
}
