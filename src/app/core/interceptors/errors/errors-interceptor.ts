import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { PlatformService } from '../../services/platform/platform.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  let tostr: ToastrService = inject(ToastrService);
  let platformService: PlatformService = inject(PlatformService);

  return next(req).pipe(catchError((err) => {
    console.error('Error occurred:', err);
    if (platformService.isBrowser())
      tostr.error(err?.error?.message || 'An error occurred while processing your request.', 'Error');



    return throwError(() => err)
  }));
};
