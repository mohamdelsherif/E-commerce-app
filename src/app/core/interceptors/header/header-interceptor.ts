import { HttpInterceptorFn } from '@angular/common/http';
import { PlatformService } from '../../services/platform/platform.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
   let platformService: PlatformService = inject(PlatformService)


  if (platformService.isBrowser()) {
    if (localStorage.getItem('freshToken')) {
      let userToken : any  = {token : localStorage.getItem('freshToken')}
      req = req.clone({
        setHeaders : userToken
      });
    }
  }
  return next(req);
};
