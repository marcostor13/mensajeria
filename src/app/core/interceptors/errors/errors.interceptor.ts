import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const nzMessageService: NzMessageService = inject(NzMessageService)
  return next(req).pipe(catchError((err: any) => {
    console.log(err)
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        nzMessageService.error('No estás autorizado para realizar esta acción.')     
      } else {
        nzMessageService.error(err.error.message)
      }
    } else {
      nzMessageService.error('Error desconocido')
    }
    return throwError(() => err)
  }))
}
