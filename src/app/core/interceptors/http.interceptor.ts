import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const modifyReq = req.clone({
    url: req.url.replace('', environment.apiHost),
  });

  return next(modifyReq).pipe(
    catchError((e: HttpErrorResponse) => {
      console.error(e.message);
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};
