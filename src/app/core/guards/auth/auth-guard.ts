import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../services/platform/platform.service';


export const authGuard: CanActivateFn = (route, state) => {


  let router: Router = inject(Router);
  let platformService: PlatformService = inject(PlatformService);

  if (platformService.isBrowser()) {
    if (localStorage.getItem('token') != null)
      return true;
    else
      router.createUrlTree(['/login']);
  }

  return true;
};
