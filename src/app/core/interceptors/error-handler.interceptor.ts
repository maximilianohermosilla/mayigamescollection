import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorDialogService } from '../services/error-dialog.service';
import { catchError, EMPTY } from 'rxjs';

export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorDialogService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = "";
    
    if(error!){
      errorMessage = error!.message ?? "Ocurrió un error";
    }

    errorService.openErrorDialog(errorMessage);

    return EMPTY;

  }))
};
